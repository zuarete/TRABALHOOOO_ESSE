function enviar(){

    var nome, senha, ok
    ok = false
    nome = document.getElementById("nome")
    senha = document.getElementById("senha")



    //validação
        if(nome.value=="zezinho"){
            if(senha.value == "1234abc"){
                alert("Login feito com sucesso")
                ok= true
            }else{
                alert("Senha incorreta para o usuario ")
            }
        }else{
            alert("Usuario não encontrado")
        }    
    

    //retorno 
    return ok 
}