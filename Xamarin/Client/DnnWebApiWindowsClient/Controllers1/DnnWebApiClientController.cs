using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace AshPrasad.DnnWebApiClient
{
	public class DnnWebApiClientController : IDisposable
	{

		private static volatile DnnWebApiClientController instance;
		private static object syncRoot = new Object();

		private DnnWebApiClientController() {}

		public static DnnWebApiClientController Instance
		{
			get 
			{
				if (instance == null) 
				{
					lock (syncRoot) 
					{
						if (instance == null) 
							instance = new DnnWebApiClientController();
					}
				}

				return instance;
			}
		}

		public const string FileFilters =
			"swf,jpg,jpeg,jpe,gif,bmp,png,doc,docx,xls,xlsx,ppt,pptx,pdf,txt,xml,"+
				"xsl,xsd,css,zip,template,htmtemplate,ico,avi,mpg,mpeg,mp3,wmv,mov,wav";

		const string UploadFileRequestPath = "DesktopModules/internalservices/API/fileupload/postfile";


		public bool IsLoggedIn { get; private set; }

		public const string RqVerifTokenName = "__RequestVerificationToken";
		public const string RqVerifTokenNameNoUndescrores = "RequestVerificationToken";
		private Uri _domain;
		private string _userName;
		private string _password;
		private CookieContainer _sessionCookiesContainer;
		private Cookie _cookieVerificationToken;
		private string _inputFieldVerificationToken;

		public void Dispose()
		{
			Logout();
		}

		private void CheckLoggedIn()
		{
			if (!IsLoggedIn)
				throw new Exception("User not logged in yet.");
		}

		public CookieContainer SessionCookies
		{
			get
			{
				CheckLoggedIn();
				return _sessionCookiesContainer;
			}
		}

		public void Logout()
		{
			if (IsLoggedIn)
			{
				IsLoggedIn = false;
				try
				{
					var requestUriString = string.Format("{0}/Home/ctl/Logoff", _domain);
					//var requestUriString = string.Format("{0}Home/ctl/Logoff.aspx", _domain);
					//var requestUriString = string.Format("{0}Logoff.aspx", _domain);
					//var requestUriString = string.Format("{0}Home/tabid/55/ctl/LogOff/Default.aspx", _domain);

					var httpWebRequest1 = (HttpWebRequest) WebRequest.Create(requestUriString);
					httpWebRequest1.Method = "GET";
					httpWebRequest1.KeepAlive = false;
					httpWebRequest1.CookieContainer = _sessionCookiesContainer;
					httpWebRequest1.ReadWriteTimeout = 90;
					using ((HttpWebResponse) httpWebRequest1.GetResponse())
					{
						// no need to read the response stream after we logoff
					}
				}
				finally 
				{
					_inputFieldVerificationToken = null;
					_cookieVerificationToken = null;
					_sessionCookiesContainer = new CookieContainer();
				}
			}
		}

		public bool Login(string siteUrl, string name, string pass)
		{
			if (IsLoggedIn) return true;

			_domain = new Uri(siteUrl);
			_userName = name;
			_password = pass;
			IsLoggedIn = false;
			_sessionCookiesContainer = new CookieContainer();
			_cookieVerificationToken = new Cookie(RqVerifTokenName, string.Empty, "/", _domain.Host);

			var requestUriString = string.Format("{0}/Login.aspx", _domain);
			var httpWebRequest1 = (HttpWebRequest)WebRequest.Create(requestUriString);
			httpWebRequest1.Method = "GET";
			httpWebRequest1.KeepAlive = false;
			httpWebRequest1.ReadWriteTimeout = 90;
			using (var httpResponse = (HttpWebResponse)httpWebRequest1.GetResponse())
			{
				var input = string.Empty;
				using (var s = httpResponse.GetResponseStream())
				{
					if (s != null)
						using (var sr = new StreamReader(s, Encoding.UTF8))
					{
						input = sr.ReadToEnd();
					}
				}

				if (httpResponse.StatusCode == HttpStatusCode.OK)
				{
					ExtractVerificationCookie(httpResponse.Headers["Set-Cookie"] ?? string.Empty);
					httpResponse.Close();

					const string str1 = "id=\"__VIEWSTATE\" value=\"";
					var startIndex1 = input.IndexOf(str1, StringComparison.Ordinal) + str1.Length;
					var num1 = input.IndexOf("\"", startIndex1, StringComparison.Ordinal);
					var str2 = input.Substring(startIndex1, num1 - startIndex1);
					const string str3 = "id=\"__EVENTVALIDATION\" value=\"";
					var startIndex2 = input.IndexOf(str3, StringComparison.Ordinal) + str3.Length;
					var num2 = input.IndexOf("\"", startIndex2, StringComparison.Ordinal);
					var str4 = input.Substring(startIndex2, num2 - startIndex2);
					var str5 = Regex.Match(input, "name=\"(.+?\\$txtUsername)\"").Groups[1].Value;
					var str6 = Regex.Match(input, "name=\"(.+?\\$txtPassword)\"").Groups[1].Value;
					var str7 = Regex.Match(input, "'ScriptManager', 'Form', \\['(.+?)'").Groups[1].Value;
					var str8 =
						Regex.Match(input, "WebForm_PostBackOptions\\(&quot;(.+?\\$cmdLogin)&quot;").Groups[1].Value;
					var str9 = Regex.Match(input, "id=\"(.+?_Login_UP)\"").Groups[1].Value;
					var str10 = string.Format(
						@"ScriptManager={6}%7C{7}&__EVENTTARGET={7}&__EVENTARGUMENT=&__VIEWSTATE={2}&" +
						@"__VIEWSTATEENCRYPTED=&__EVENTVALIDATION={3}&{4}={0}&{5}={1}&__ASYNCPOST=true&RadAJAXControlID={8}",
						_userName, _password, HttpUtility.UrlEncode(str2), HttpUtility.UrlEncode(str4),
						HttpUtility.UrlEncode(str5),
						HttpUtility.UrlEncode(str6), HttpUtility.UrlEncode(str7), HttpUtility.UrlEncode(str8),
						HttpUtility.UrlEncode(str9));
					var bytes = Encoding.UTF8.GetBytes(str10);

					var httpWebRequest2 = (HttpWebRequest)WebRequest.Create(requestUriString);
					httpWebRequest2.Method = "POST";
					httpWebRequest2.KeepAlive = false;
					httpWebRequest2.ContentType = "application/x-www-form-urlencoded";
					httpWebRequest2.CookieContainer = _sessionCookiesContainer;
					httpWebRequest2.ContentLength = bytes.Length;
					httpWebRequest2.ReadWriteTimeout = 90;
					using (var requestStream = httpWebRequest2.GetRequestStream())
					{
						requestStream.Write(bytes, 0, bytes.Length);
					}

					using (var httpResponse2 = (HttpWebResponse) httpWebRequest2.GetResponse())
					{
						if (httpResponse2.StatusCode == HttpStatusCode.OK)
						{
							// no need to read this the stream

							IsLoggedIn =
								(httpResponse2.StatusCode == HttpStatusCode.OK) &&
									(httpResponse2.Cookies[".DOTNETNUKE"] != null);
							if (IsLoggedIn) GetDefaultPageToken();
						}
					}
				}
			}

			return IsLoggedIn;
		}

		public ServerResponse Get(GetParms parm)
		{
			var url = string.Format("{0}{1}{2}", _domain, parm.EndPoint, parm.QueryString);

			var request = (HttpWebRequest) WebRequest.Create(url);
			if(parm.TabId > 0) request.Headers["TabID"] = parm.TabId.ToString();
			if(parm.TabId > 0) request.Headers["ModuleID"] = parm.ModuleId.ToString();
			request.Method = "GET";
			request.KeepAlive = false;
			request.CookieContainer = _sessionCookiesContainer;
			request.ReadWriteTimeout = 90;
			var response = new ServerResponse();
			using (var httpResponse = (HttpWebResponse) request.GetResponse())
			{
				response.Status = httpResponse.StatusCode;
				using (var s = httpResponse.GetResponseStream())
				{
					if (s != null)
						using (var sr = new StreamReader(s, Encoding.UTF8))
					{
						response.Data = sr.ReadToEnd();
					}
				}
			}

			return response;
		}

        public ServerResponse Post(PostParms parm)
		{
            var response = new ServerResponse();

            using (var client = GetUploadContentClient())
            {
                var rqHeaders = client.DefaultRequestHeaders;
                rqHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                rqHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("text/html", 0.5d));
                rqHeaders.Add("X-Requested-With", "XMLHttpRequest");

                if (parm.TabId > 0) rqHeaders.Add("TabID", parm.TabId.ToString());
                if (parm.TabId > 0) rqHeaders.Add("ModuleID", parm.ModuleId.ToString());

                var url = string.Format("{0}{1}", _domain, parm.EndPoint);
                var uri = new Uri(url);

                var result = client.PostAsJsonAsync(uri.ToString(), parm.Content).Result;
                result.EnsureSuccessStatusCode();

                //return new HttpResponseMessage { StatusCode = HttpStatusCode.Accepted };
            }

            return response;
		}

        private HttpClient GetUploadContentClient()
        {
            var clientHandler = new HttpClientHandler
            {
                CookieContainer = _sessionCookiesContainer
            };

            var client = new HttpClient(clientHandler) { BaseAddress = _domain };
            client.DefaultRequestHeaders.Add(RqVerifTokenNameNoUndescrores, _inputFieldVerificationToken);
            return client;
        }

		private void ExtractVerificationCookie(string cookiesString)
		{
			var parts1 = cookiesString.Split(',');
			foreach (var part1 in parts1)
			{
				if (part1.Contains(RqVerifTokenName))
				{

					var parts2 = part1.Split(';');
					foreach (var part2 in parts2)
					{
						if (part2.Contains(RqVerifTokenName))
						{
							_cookieVerificationToken.Value = part2.Split('=')[1];
						}
						else if (part2.Contains("path"))
						{
							_cookieVerificationToken.Path = part2.Split('=')[1];
						}
					}
					break;
				}
			}
		}

		public string GetDefaultPageToken()
		{
			if (string.IsNullOrEmpty(_inputFieldVerificationToken))
			{
				var httpWebRequest1 = (HttpWebRequest) WebRequest.Create(_domain);
				httpWebRequest1.Method = "GET";
				httpWebRequest1.KeepAlive = false;
				httpWebRequest1.CookieContainer = _sessionCookiesContainer;
				httpWebRequest1.ReadWriteTimeout = 90;
				using (var httpResponse = (HttpWebResponse)httpWebRequest1.GetResponse())
				{
					string data = string.Empty;
					using (var s = httpResponse.GetResponseStream())
					{
						if (s != null)
							using (var sr = new StreamReader(s, Encoding.UTF8))
						{
							data = sr.ReadToEnd();
						}
					}

					if (httpResponse.StatusCode == HttpStatusCode.OK)
					{
						const string str1 = "<input name=\"__RequestVerificationToken\" type=\"hidden\" value=\"";
						var startIndex1 = data.IndexOf(str1, StringComparison.Ordinal) + str1.Length;
						var num1 = data.IndexOf("\"", startIndex1, StringComparison.Ordinal);
						_inputFieldVerificationToken = data.Substring(startIndex1, num1 - startIndex1);
					}

				}
			}

			return _inputFieldVerificationToken;
		}

		#region file uploading
		/*
		public void UploadUserFile(string fileName)
		{
			CheckLoggedIn();
			UploadFile(fileName, "Users", _sessionCookiesContainer);
		}

		public bool UploadCmsFile(string fileName, string portalFolder)
		{
			CheckLoggedIn();
			var result = UploadFile(fileName, portalFolder, _sessionCookiesContainer);
			return result.IsSuccessStatusCode;
		}

*/
		/*
		private HttpResponseMessage UploadFile(string fileName,
		                                       string portalFolder, CookieContainer cookieContainer, bool waitHttpResponse = true)
		{
			var clientHandler = new HttpClientHandler();
			var client = new HttpClient(clientHandler);
			clientHandler.CookieContainer = _sessionCookiesContainer;
			client.BaseAddress = _domain;
			client.DefaultRequestHeaders.Accept.Add(
				new MediaTypeWithQualityHeaderValue("application/json"));
			client.DefaultRequestHeaders.Accept.Add(
				new MediaTypeWithQualityHeaderValue("text/html",0.8));
			var resultGet = client.GetAsync("/").Result;
			var data = resultGet.Content.ReadAsStringAsync().Result;
			const string str1 = "<input name=\"__RequestVerificationToken\" type=\"hidden\" value=\"";
			var startIndex1 = data.IndexOf(str1, StringComparison.Ordinal);
			if (startIndex1 >= 0)
			{
				startIndex1 += str1.Length;
				var num1 = data.IndexOf("\"", startIndex1, StringComparison.Ordinal);
				var requestVerificationToken = data.Substring(startIndex1, num1 - startIndex1);
				client.DefaultRequestHeaders.Add(RqVerifTokenNameNoUndescrores, requestVerificationToken);
			}
			else
			{
				Logger.ErrorFormat("Cannot find '{0}' in the page input fields", RqVerifTokenName);
			}

			var content = new MultipartFormDataContent();
			var values = new[]
			{
				new KeyValuePair<string, string>("\"folder\"", portalFolder),
				new KeyValuePair<string, string>("\"filter\"", FileFilters)
			};

			foreach (var keyValuePair in values)
			{
				content.Add(new StringContent(keyValuePair.Value), keyValuePair.Key);
			}

			var fi = new FileInfo(fileName);
			var fileContent = new ByteArrayContent(File.ReadAllBytes(fileName));
			fileContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
			{
				FileName = fi.Name,
				Name = "\"postfile\""
			};

			content.Add(fileContent);
			var tabId = TabController.GetTabByName("Activity Feed", _portalId).TabID;
			client.DefaultRequestHeaders.Add("TabID", tabId.ToString(CultureInfo.InvariantCulture));
			var result = client.PostAsync(UploadFileRequestPath, content).Result;

			if (waitHttpResponse)
				return result.EnsureSuccessStatusCode();

			return new HttpResponseMessage { StatusCode = HttpStatusCode.Accepted };
		}
		*/
		#endregion

		#region uploading content
		/*
		public HttpResponseMessage UploadUserContentAsJson(string relativeUrl,
		                                                   object content, Dictionary<string, string> contentHeaders, bool waitHttpResponse)
		{
			CheckLoggedIn();
			using (var client = GetUploadContentClient("/"))
			{
				var rqHeaders = client.DefaultRequestHeaders;
				rqHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
				rqHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("text/html", 0.5d));
				rqHeaders.Add("X-Requested-With", "XMLHttpRequest");

				if (contentHeaders != null)
				{
					foreach (var hdr in contentHeaders)
					{
						rqHeaders.Add(hdr.Key, hdr.Value);
					}
				}

				var requestUriString = string.Format("{0}{1}", _domain, relativeUrl);
				var uri = new Uri(requestUriString);
				if (uri.AbsolutePath.StartsWith("//"))
				{
					uri = new Uri(_domain + relativeUrl);
				}
				var result = client.PostAsJsonAsync(uri.ToString(), content).Result;

				if (waitHttpResponse)
					return result.EnsureSuccessStatusCode();

				return new HttpResponseMessage {StatusCode = HttpStatusCode.Accepted};
			}
		}
*/
		/*
		private HttpClient GetUploadContentClient(string path)
		{
			var clientHandler = new HttpClientHandler
			{
				CookieContainer = _sessionCookiesContainer
			};

			var client = new HttpClient(clientHandler) { BaseAddress = _domain };
			if (string.IsNullOrEmpty(_inputFieldVerificationToken))
			{
				var resultGet = client.GetAsync(path).Result;
				var data = resultGet.Content.ReadAsStringAsync().Result;
				const string str1 = "<input name=\"__RequestVerificationToken\" type=\"hidden\" value=\"";
				var startIndex1 = data.IndexOf(str1, StringComparison.Ordinal) + str1.Length;
				var num1 = data.IndexOf("\"", startIndex1, StringComparison.Ordinal);
				var requestVerificationToken = data.Substring(startIndex1, num1 - startIndex1);
				client.DefaultRequestHeaders.Add(RqVerifTokenNameNoUndescrores, requestVerificationToken);
			}
			else
			{
				client.DefaultRequestHeaders.Add(RqVerifTokenNameNoUndescrores, _inputFieldVerificationToken);
			}
			return client;
		}

		private string[] GetPageInputFields(HttpClient client, string path)
		{
			var resultGet = client.GetAsync(_domain + path).Result;
			var data = resultGet.Content.ReadAsStringAsync().Result;
			const string str1 = "<input name=\"__RequestVerificationToken\" type=\"hidden\" value=\"";
			var startIndex1 = data.IndexOf(str1, StringComparison.Ordinal);
			if (startIndex1 >= 0)
			{
				startIndex1 += str1.Length;
				var num1 = data.IndexOf("\"", startIndex1, StringComparison.Ordinal);
				var requestVerificationToken = data.Substring(startIndex1, num1 - startIndex1);
				client.DefaultRequestHeaders.Add(RqVerifTokenNameNoUndescrores, requestVerificationToken);
			}
			else
			{
				Logger.ErrorFormat("Cannot find '{0}' in the page input fields", RqVerifTokenName);
			}

			var inputFields = HtmlFormInuts.Matches(data).Cast<Match>().Select(match => match.Groups[0].Value).ToArray();
			return inputFields;
		}

		private static readonly Regex HtmlFormInuts = new Regex(@"<input .*?/>",
		                                                        RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);

		public HttpWebResponse PostUserForm(string relativeUrl,
		                                    string userName, Dictionary<string, string> formFields, List<string> excludedInputPrefixes)
		{
			CheckLoggedIn();

			var clientHandler = new HttpClientHandler
			{
				CookieContainer = _sessionCookiesContainer
			};

			var postParameters = new Dictionary<string, object>();
			using (var client = new HttpClient(clientHandler) {BaseAddress = _domain})
			{
				var inputFields = GetPageInputFields(client, relativeUrl);
				var firstField = formFields.First().Key;
				if (!inputFields.Any(f => f.Contains(firstField)))
				{
					// user can't create groups; no create group fields present in page
					Logger.ErrorFormat("User '{0}' has no rights to create groups.", userName);
					return null;
				}

				foreach (var field in inputFields)
				{
					var xe = XElement.Parse(field);
					var attrs = xe.Attributes().ToArray();
					var inputType = attrs.FirstOrDefault(a => "type" == a.Name);
					var inputName = attrs.FirstOrDefault(a => "name" == a.Name);
					var inputValue = attrs.FirstOrDefault(a => "value" == a.Name);
					if (inputType != null && inputName != null)
					{
						switch (inputType.Value)
						{
							case "hidden":
						{
							var value = inputValue == null ? "" : inputValue.Value;
							if (formFields.ContainsKey(inputName.Value))
								value = formFields[inputName.Value];
							postParameters.Add(inputName.Value, (inputValue == null) ? "" : value);
						}
							break;
							case "text":
							case "checkbox":
							case "radio":
							if (formFields.ContainsKey(inputName.Value) && !postParameters.ContainsKey(inputName.Value))
								postParameters.Add(inputName.Value, formFields[inputName.Value]);
							break;
							// other types as "submit", etc. are ignored/discarded
						}
					}
				}

				foreach (var field in formFields)
				{
					if (!postParameters.ContainsKey(field.Key))
						postParameters.Add(field.Key, field.Value);
				}

				if (excludedInputPrefixes != null)
				{
					var keys = postParameters.Keys.ToArray();
					foreach (var prefix in excludedInputPrefixes)
					{
						foreach (var key in keys)
						{
							if (key.StartsWith(prefix))
								postParameters.Remove(key);
						}
					}
				}
			}

			if (postParameters.Count > 0)
			{
				const string userAgent =
					"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.72 Safari/537.36";
				return MultipartFormDataPost(_domain + relativeUrl, userAgent, postParameters);
			}

			return null;
		}
*/
		#endregion

		#region Multipart Form Data Post

		// ==============================================================================
		// Adapted from http://www.briangrinstead.com/blog/multipart-form-post-in-c#
		/*
		private static readonly Encoding Encoding = Encoding.UTF8;

		public HttpWebResponse MultipartFormDataPost(string postUrl, string userAgent, Dictionary<string, object> postParameters)
		{
			var formDataBoundary = String.Format("~~Boundary~~{0:X16}", DateTime.Now.Ticks);
			var contentType = "multipart/form-data; boundary=" + formDataBoundary;
			var formData = GetMultipartFormData(postParameters, formDataBoundary);

			return PostForm(postUrl, userAgent, contentType, formData);
		}
*/
		private HttpWebResponse PostForm(string postUrl, string userAgent, string contentType, byte[] formData)
		{
			var request = WebRequest.Create(postUrl) as HttpWebRequest;

			if (request == null)
			{
				throw new NullReferenceException("request is not a http request");
			}

			// Set up the request properties.
			request.Method = "POST";
			request.ContentType = contentType;
			request.UserAgent = userAgent;
			request.CookieContainer = _sessionCookiesContainer;
			request.ContentLength = formData.Length;
			request.Headers.Add(RqVerifTokenNameNoUndescrores, _inputFieldVerificationToken);
			request.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
			request.KeepAlive = true;
			request.ReadWriteTimeout = 90;

			// You could add authentication here as well if needed:
			// request.PreAuthenticate = true;
			// request.AuthenticationLevel = System.Net.Security.AuthenticationLevel.MutualAuthRequested;
			// request.Headers.Add("Authorization", "Basic " + 
			//     Convert.ToBase64String(System.Text.Encoding.Default.GetBytes("username" + ":" + "password")));

			// Send the form data to the request.
			using (var requestStream = request.GetRequestStream())
			{
				requestStream.Write(formData, 0, formData.Length);
				requestStream.Close();
			}

			return request.GetResponse() as HttpWebResponse;
		}
		/*
		private static byte[] GetMultipartFormData(Dictionary<string, object> postParameters, string boundary)
		{
			Stream formDataStream = new MemoryStream();
			var needsCLRF = false;

			foreach (var param in postParameters)
			{
				// Thanks to feedback from commenters, add a CRLF to allow multiple parameters to be added.
				// Skip it on the first parameter, add it to subsequent parameters.
				if (needsCLRF)
					formDataStream.Write(Encoding.GetBytes("\r\n"), 0, Encoding.GetByteCount("\r\n"));

				needsCLRF = true;

				if (param.Value is FileParameter)
				{
					var fileToUpload = (FileParameter)param.Value;

					// Add just the first part of this param, since we will write the file data directly to the Stream
					var header = string.Format("--{0}\r\nContent-Disposition: form-data; name=\"{1}\"; filename=\"{2}\";\r\nContent-Type: {3}\r\n\r\n",
					                           boundary,
					                           param.Key,
					                           fileToUpload.FileName ?? param.Key,
					                           fileToUpload.ContentType ?? "application/octet-stream");

					formDataStream.Write(Encoding.GetBytes(header), 0, Encoding.GetByteCount(header));

					// Write the file data directly to the Stream, rather than serializing it to a string.
					formDataStream.Write(fileToUpload.File, 0, fileToUpload.File.Length);
				}
				else
				{
					var postData = string.Format("--{0}\r\nContent-Disposition: form-data; name=\"{1}\"\r\n\r\n{2}",
					                             boundary,
					                             param.Key,
					                             param.Value);
					formDataStream.Write(Encoding.GetBytes(postData), 0, Encoding.GetByteCount(postData));
				}
			}

			// Add the end of the request.  Start with a newline
			var footer = "\r\n--" + boundary + "--\r\n";
			formDataStream.Write(Encoding.GetBytes(footer), 0, Encoding.GetByteCount(footer));

			// Dump the Stream into a byte[]
			formDataStream.Position = 0;
			var formData = new byte[formDataStream.Length];
			formDataStream.Read(formData, 0, formData.Length);
			formDataStream.Close();

			return formData;
		}
*/
		#endregion
	}
}

