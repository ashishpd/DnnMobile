using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DnnMobiHelper.Models;
using DotNetNuke.Application;
using DotNetNuke.Common;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Portals.Internal;
using DotNetNuke.Entities.Tabs;
using DotNetNuke.Security.Permissions;
using DotNetNuke.Web.Api;
using MyServices.Entities;

namespace DnnMobiHelper
{
    public class HelperController : DnnApiController
    {
        private readonly string _dnnVersion = Globals.FormatVersion(DotNetNukeContext.Current.Application.Version, false);
        /*
        private readonly List<SiteDetail> _knownSites = KnownSites();

        private static List<SiteDetail> KnownSites()
        {
            var sites = new List<SiteDetail>
                {
                    new SiteDetail
                        {
                            DnnVersion = "7.2.1",
                            SiteName = "www.dnnsoftware.com",
                            Modules =
                                new List<ModuleDetail>
                                    {
                                        new ModuleDetail
                                            {
                                                ModuleName = "DotNetNuke.Modules.CoreMessaging",
                                                ModuleInstances = new List<ModuleInstance> {new ModuleInstance{ModuleId = 446, TabId = 67}}
                                            }, new ModuleDetail
                                            {
                                                ModuleName = "Answers",
                                                ModuleInstances = new List<ModuleInstance> {new ModuleInstance{ModuleId = 601, TabId = 145}}
                                            }, new ModuleDetail
                                            {
                                                ModuleName = "Ideas",
                                                ModuleInstances = new List<ModuleInstance> {new ModuleInstance{ModuleId = 602, TabId = 153}}
                                            }, new ModuleDetail
                                            {
                                                ModuleName = "Blogs",
                                                ModuleInstances = new List<ModuleInstance> {new ModuleInstance{ModuleId = 1568, TabId = 150}}
                                            }, new ModuleDetail
                                            {
                                                ModuleName = "Webinars",
                                                ModuleInstances = new List<ModuleInstance> {new ModuleInstance{ModuleId = 608, TabId = 152}}
                                            }
                                    }
                        }
                };

            return sites;
        }
        */

        /*
        [AllowAnonymous]
        [HttpGet]
        public HttpResponseMessage ExternalSiteDetails(string siteName)
        {
            var siteDetails = new SiteDetail();

            foreach (var site in _knownSites.Where(site => site.SiteName.ToLower() == siteName.ToLower()))
            {
                return Request.CreateResponse(HttpStatusCode.OK, site);
            }

            return Request.CreateResponse(HttpStatusCode.OK, siteDetails);    
        }
        */
        [AllowAnonymous]
        [HttpGet]
        public HttpResponseMessage ModuleDetails(string moduleList)
        {
            var siteDetails = new SiteDetail
                {
                    SiteName = PortalSettings.PortalName,
                    DnnVersion = _dnnVersion,
                    IsHost = UserInfo.IsSuperUser,
                    IsAdmin = UserInfo.IsInRole("Administrators")
                };
            foreach (var moduleName in moduleList.Split(','))
            {
                
                foreach (
                    var tabmodule in
                        GetTabModules(moduleName)
                            .Where(tabmodule => TabPermissionController.CanViewPage(tabmodule.TabInfo) &&
                                                ModulePermissionController.CanViewModule(tabmodule.ModuleInfo)))
                {
                    var moduleDetail = new ModuleDetail { ModuleName = moduleName };
                    moduleDetail.ModuleVersion = tabmodule.ModuleVersion;
                    moduleDetail.ModuleInstances.Add(new ModuleInstance
                                                         {
                                                             TabId = tabmodule.TabInfo.TabID,
                                                             ModuleId = tabmodule.ModuleInfo.ModuleID,
                                                             PageName = tabmodule.TabInfo.TabName,
                                                             PagePath = tabmodule.TabInfo.TabPath
                                                         });
                    siteDetails.Modules.Add(moduleDetail);
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, siteDetails);
        }


        private static IEnumerable<TabModule> GetTabModules(string moduleName)
        {

            var portalId = TestablePortalController.Instance.GetCurrentPortalSettings().PortalId;
            var desktopModule = DesktopModuleController.GetDesktopModuleByModuleName(moduleName, portalId);
            if (desktopModule != null)
            {

                var cacheKey = string.Format(DataCache.DesktopModuleCacheKey, portalId) + "_" +
                               desktopModule.DesktopModuleID;
                var args = new CacheItemArgs(cacheKey, DataCache.DesktopModuleCacheTimeOut,
                                             DataCache.DesktopModuleCachePriority, portalId, desktopModule);

                return CBO.GetCachedObject<IList<TabModule>>(args, GetTabModulesCallback);
            }

            return new List<TabModule>(); 
        }

        private static object GetTabModulesCallback(CacheItemArgs cacheItemArgs)
        {

            var tabModules = new List<TabModule>();

            var portalId = (int)cacheItemArgs.ParamList[0];
            var desktopModule = (DesktopModuleInfo)cacheItemArgs.ParamList[1];
            
            var tabController = new TabController();
            var tabsWithModule = tabController.GetTabsByPackageID(portalId, desktopModule.PackageID, false);
            var allPortalTabs = tabController.GetTabsByPortal(portalId);
            IDictionary<int, TabInfo> tabsInOrder = new Dictionary<int, TabInfo>();

            //must get each tab, they parent may not exist
            foreach (var tab in allPortalTabs.Values)
            {
                AddChildTabsToList(tab, ref allPortalTabs, ref tabsWithModule, ref tabsInOrder);
            }


            foreach (var tab in tabsInOrder.Values)
            {
                tabModules.AddRange(
                    tab.ChildModules.Values.Where(
                        childModule => childModule.DesktopModuleID == desktopModule.DesktopModuleID)
                       .Select(childModule => new TabModule
                                                  {
                                                      TabInfo = tab,
                                                      ModuleInfo = childModule,
                                                      ModuleVersion = desktopModule.Version
                                                  }));
            }

            return tabModules;
        }

        private static void AddChildTabsToList(TabInfo currentTab, ref TabCollection allPortalTabs, ref IDictionary<int, TabInfo> tabsWithModule, ref IDictionary<int, TabInfo> tabsInOrder)
        {
            if ((tabsWithModule.ContainsKey(currentTab.TabID) && !tabsInOrder.ContainsKey(currentTab.TabID)))
            {
                //add current tab
                tabsInOrder.Add(currentTab.TabID, currentTab);
                //add children of current tab
                foreach (TabInfo tab in allPortalTabs.WithParentId(currentTab.TabID))
                {
                    AddChildTabsToList(tab, ref allPortalTabs, ref tabsWithModule, ref tabsInOrder);
                }
            }
        }


    }
}
