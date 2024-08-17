
class FacebookService {
	constructor() {
	  this.userId = "";
	  this.accessToken = "";
	}
  
	signIn(callback) {
	  return new Promise((resolve, reject) => {
		FB.getLoginStatus(response => {
		  if (response.status === "connected") {
			this._handleLogin(response, callback);
			resolve(response);
		  } else {
			FB.login(response => {
			  this._handleLogin(response, callback);
			  resolve(response);
			}, { scope: "publish_actions", return_scopes: true });
		  }
		});
	  });
	}
  
	signOut() {
	  return new Promise((resolve, reject) => {
		FB.logout(response => {
		  this.userId = "";
		  this.accessToken = "";
		  this.refreshStatus();
		  resolve(response);
		});
	  });
	}
  
	createPost(content) {
	  const urlPattern = ;
	  let postContent = content || document.getElementById("publish-textarea").value;
	  let cleanedMessage = postContent.replace(urlPattern, "").trim();
	  let foundLink = postContent.match(urlPattern) || [""];
  
	  return new Promise((resolve, reject) => {
		FB.api(`/${this.userId}/feed`, "post", {
		  access_token: this.accessToken,
		  message: cleanedMessage,
		  link: foundLink[0]
		}, response => {
		  if (!response || response.error) {
			reject(response.error);
		  } else {
			resolve(response);
		  }
		});
	  });
	}
  
	isAuthenticated() {
	  return this.userId !== "";
	}
  
	refreshStatus() {
	  FB.getLoginStatus(response => {
		const statusIcon = response.status === "connected"
		  ? ""
		  : " ";
		document.getElementById("facebook-status-check").setAttribute("src", statusIcon);
	  });
	}
  
	_handleLogin(response, callback) {
	  this.userId = response.authResponse.userID || "";
	  this.accessToken = response.authResponse.accessToken || "";
	  this.refreshStatus();
	  if (callback) callback(response);
	}
  }
  
  export default FacebookService;
  
