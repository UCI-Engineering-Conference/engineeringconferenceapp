const attendeeEmail = (firstname, lastname, CONFIG) => {
  return `
  <div style="text-align:center">
    <img alt="Engineering Conference" style="widinvali://wt-ec93f04fb278b9f3f2b7a660e2425240-0.sandbox.auth0-extend.com/applicationSubmissionth:50%;" src="http://www.engineeringconferenceuci.com/static/img/thumbnail.png" />
  </div>
  <div style="padding:5px;margin-top:10px;background-color: #65D25C;">
  </div>
  <p><b>Amazing,</b></p>
  <p>This is the official ticket receipt for <b>${firstname} ${lastname}</b> to attend Engineering Conference on <b>${CONFIG.CONFERENCE_DATE}</b>.</p>
  <p></p>
  <p>Cheers,</p>
  <p><b>UCI Engineering Conference</b></p>
  <div style="background-color: #65D25C;padding: 20px;color: #FFFFFF; text-align:center">
    <a href="https://www.facebook.com/EConferenceUCI"><img alt="Facebook" style="display:inline-block; padding:10px;width:25px;" src="https://cdn4.iconfinder.com/data/icons/social-media-outline-3/60/Social-01-Facebook-Outline-128.png" /></a>
    <a href="https://twitter.com/@EConferenceUCI"><img alt="Twitter" style="display:inline-block; padding:10px;width:25px;" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-twitter-outline-128.png" /></a>
    <a href="https://instagram.com/EConferenceUCI"><img alt="Instagram" style="display:inline-block; padding:10px;width:25px;" src="https://cdn4.iconfinder.com/data/icons/materia-social-free/24/038_011_instagram_mobile_photo_network_android_material-128.png" /></a>
  </div>`;
};

module.exports = {
  attendeeEmail
};
