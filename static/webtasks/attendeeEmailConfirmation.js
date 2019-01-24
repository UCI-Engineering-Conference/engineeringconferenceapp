'use latest';
import sendgrid from 'sendgrid';
const helper = sendgrid.mail;
/**
 * @param context {WebtaskContext}
 */
module.exports = (context, cb) => {
  // POST a JSON with at least the following properties.
  const { from_email, to_email, subject, content } = context.body;
  const mail = new helper.Mail(
    new helper.Email(from_email),
    subject,
    new helper.Email(to_email),
    new helper.Content('text/html', content)
  );
  const sg = sendgrid(context.secrets.SENDGRID_API_KEY);
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
  sg.API(request)
    .then(response => cb(null, response))
    .catch(cb);
};