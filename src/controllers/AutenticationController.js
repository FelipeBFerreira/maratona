const Autentication = require('../model/Autentication')

module.exports = {

    /* Implementado uma autenticação usando informações do sqlite, onde e chamada a rota login e
     * apos isso e enviado para tela de autenticação Begin
    */
    signup(req, res) {
        const logado = req.body["logado"]
        const message = "Seja Bem vindo"
        res.render('signup', { Mensagem: message })

        /* End */
    },
    /* A chamada login valida os dados enviado pelo form e compara com o dados do sqlite e os dados forem validos
        o usuario e redicionado para tela inicial 
    */

    async Login(req, res) {

        const autentication = Autentication.getVerificarion(req.body["login"], req.body["password"])


        autentication.then((v) => {

            try {
                if (req.body["login"] === v.name) {

                    console.log("Match")
                    return res.redirect("/")
                }
            } catch (err) {

                console.log("Not Match")
                console.log(req.body["login"] + req.body["password"])
                console.log(err)
                const message = "Login ou Senha Invalidos"
                return res.render("signup", { Mensagem: message })

            }

        })

    },
    /* End */





}