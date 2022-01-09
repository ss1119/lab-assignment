const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const adminEmail = functions.config().admin.email

// SMTPサーバーの設定
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
})

// ユーザから問い合わせ時に管理者に送るメッセージ
const adminInqueries = (data) => {
  return `お問い合わせがありました。

お名前:
${data.name}

メールアドレス:
${data.email}

件名:
${data.subject}

内容:
${data.message}

頂いたメールアドレスと内容を元に、お問い合わせ内容の回答をお願いいたします。

** 注意事項 **
・このメールは、ユーザから研究室配属希望調査を経由して、自動的に送信されたメッセージになります。
・このメールに返信をしても、ユーザが確認することができません。
・問い合わせがあったユーザに、新規でメールを作成してください。

------------------------------------------------------
同志社大学大学院 理工学研究科 情報工学専攻
同志社大学 理工学部 情報システムデザイン学科
研究室配属希望調査管理チーム
------------------------------------------------------
`
}

// TODO: Corsでエラーになるため、次回解決
// ユーザから問い合わせ時にユーザに送るメッセージ
const userInqueries = (data) => {
  return `${data.name}さん

お問合せありがとうございます。
研究室希望配属調査管理チームでございます。

以下、問い合わせ内容となります。

件名:
${data.subject}

内容:
${data.message}

こちらの内容を元に、管理チームが回答をいたしますので、しばらくお待ち下さい。
お時間を頂き、大変恐縮ですが、よろしくお願いいたします。

** 注意事項 **
・このメールは、研究室配属希望調査を経由して、自動的に送信されたメッセージになります。
・このメールに返信をしても、管理チームが確認することができません。
・管理チームからのメールが来るまで、しばらくお待ちください。

------------------------------------------------------
同志社大学大学院 理工学研究科 情報工学専攻
同志社大学 理工学部 情報システムデザイン学科
研究室配属希望調査管理チーム
------------------------------------------------------
`
}

// ユーザから問い合わせの実行
exports.sendInqueries = functions.https.onCall(async (data, context) => {
  const admin = {
    from: gmailEmail,
    to: adminEmail,
    subject: '研究室配属希望調査のお問い合わせ【' + data.name + 'さん】',
    text: adminInqueries(data),
  }

  const user = {
    from: gmailEmail,
    to: data.email,
    subject: '【研究室配属希望調査】お問い合わせの完了',
    text: userInqueries(data),
  }

  try {
    await mailTransport.sendMail(admin)
    await mailTransport.sendMail(user)
  } catch (err) {
    return err.message
  }
})
