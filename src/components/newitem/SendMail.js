const nodemailer = require("nodemailer");
const express = require('express');

const app = express();

app.get("/sendmail", async (req,res) => {
    //transporter
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "16b096afe6732d",
          pass: "c5958e8dfd2665"
        }
      });

      let mailOptions = {
          from: "Pessoa Teste"
      }
    
    //config email
    let message = await transport.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;1,400;1,700&family=Roboto:wght@300;400;700;900&display=swap');
        
              * {
                margin: 0;
                padding: 0;
              }
        
              body {
                font-family: "Roboto Condensed", sans-serif;
                background-color: #d8dada;
                font-size: 14px;
                max-width: 800px;
                margin: 0 auto;
                padding: 3%;
              }
              
              #social {
                margin: 3% 2% 3% 2%;
                text-align: center;
                list-style-type: none;
              }
        
              #social > li {
                display: inline;
              }
        
              #social > li > a > img {
                max-width: 150px;
              }
        
              #items {
                font-weight: 300;
              }
        
              #itemname {
                font-size: 18px;
                font-weight: 700
              }
        
              img {
                max-width: 100%;
              }
        
              header {
                width: 98%;
              }
        
              #logo {
                max-width: 250px;
                margin: auto;      
              }
        
              #wrapper {
                background-color: #ffffff;
              }
        
              h1,
              p {
                margin: 3%;
              }
              .btn {
                float: right;
                margin: 0 2% 4% 0;
                background-color: #303840;
                color: #f6faff;
                text-decoration: none;
                font-weight: 800;
                padding: 8px 12px;
                border-radius: 8px;
                letter-spacing: 2px;
              }
        
              hr {
                height: 2px;
                background-color: #013350;
                clear: both;
                width: 100%;
                margin: auto;
              }
        
              #contact {
                text-align: center;
                padding-bottom: 3%;
                line-height: 16px;
                font-size: 12px;
                color: #303840;
              }
            </style>
          </head>
          <body>
            <div id="wrapper">
              <header>
                <div id="logo">
                  <img
                    src="https://cdn-bkhol.nitrocdn.com/wYCCUQdXNsicvhMtsYVeobwcjndffYtY/assets/static/optimized/rev-6fbe505/wp-content/uploads/2019/08/logo-horizontal.png"
                    alt=""
                  />
              </header>
              <hr/>
              <div class="one-col">
        
                <h1>Pedido de Compra</h1>
        
                <div id = "items">
                  <div id = 'itemname'>
                    <p>
                      {{item1}}
                    </p>
                  </div>
                  <div id = "itemqtd">
                    <p>
                      {{quantidade}}
                    </p>
                  <div id = "itemdescription">
                    <p>
                      {{descricao}}
                    </p>
                  </div>
                  </div>
                  <br>
                  <div id = 'itemname'>
                    <p>
                      {{item2}}
                    </p>
                  </div>
                  <div id = "itemqtd">
                    <p>
                      {{quantidade}}
                    </p>
                  <div id = "itemdescription">
                    <p>
                      {{descricao}}
                    </p>
                  </div>
                  </div>
                </div>
                <ul id="social">
                  <li>
                    <a href="#" target="_blank"
                      ><img
                        src="https://i.ibb.co/qxMbbkJ/botao-aprovar.png"
                        alt="botao-aprovar"
                    /></a>
                  </li>
                  <li>
                    <a href="#" target="_blank"
                      ><img
                        src="https://i.ibb.co/YbdVnsQ/botao-reprovar.png"
                        alt="botao-reprovar"
                    /></a>
                  </li>
                </ul>
        
                <hr id="linebottom">
        
                <footer>
                  <p id="contact">
                    PEN Life International School <br />
                    Avenida Piraporinha 516, São Paulo, Brasil <br />
                    contato@penlife.com.br
                  </p>
                </footer>
              </div>
            </div>
          </body>
        </html>`, // html body
      });
    res.send('enviou');
});

  app.listen(3001, () => {
      console.log("rodando na porta 3001");
  });