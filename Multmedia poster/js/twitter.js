
class TwitterService {
	constructor() {
	  this.twitterID = localStorage.getItem("twitterID") || this.generateFingerprint();
	}
  
	generateFingerprint() {
	  return getFingerprint();
	}
  
	signIn() {
	  const currentTwitterID = this.twitterID;
  
	  return new Promise((resolve, reject) => {
		$.ajax({
		  url: "",
		  data: { action: "login", id: currentTwitterID },
		  type: "POST"
		}).done(response => {
		  localStorage.setItem("twitterID", currentTwitterID);
		  window.location.href = response;
		  resolve(response);
		}).fail(error => {
		  reject(error);
		});
	  });
	}
  
	signOut() {
	  localStorage.removeItem("twitterID");
	  this.refreshStatus();
	}
  
	createPost(content) {
	  const tweetMessage = content || document.getElementById("publish-textarea").value;
  
	  return new Promise((resolve, reject) => {
		$.ajax({
		  url: "",
		  data: { action: "post", id: localStorage.getItem("twitterID"), message: tweetMessage },
		  type: "POST"
		}).done(response => {
		  console.log(response);
		  resolve(response);
		}).fail(error => {
		  reject(error);
		});
	  });
	}
  
	isAuthenticated() {
	  return !!localStorage.getItem("twitterID");
	}
  
	refreshStatus() {
	  const statusIcon = this.isAuthenticated() ? "" : "";
	  document.getElementById("twitter-status-check").setAttribute("src", statusIcon);
	}
  }
  
  export default TwitterService;
  