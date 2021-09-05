var _instance = null;

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue !',
        github_data: null,
        languages: [],
        projets: []
    },

    beforeCreate: () => {

        _instance = axios.create({
            baseURL: 'https://qcorps.herokuapp.com/api/v1/',
            timeout: 10000
        });


        _instance.get("/github/user").then((response) => {
            app.github_data = (response.data.data)
            
            
            app.github_data.forEach(element => {
                if(!app.languages.includes(element.language) && element.language != null){
                    app.languages.push(element.language)
                }
            });


            console.log(app.github_data[0]);
           
        });

        
        _instance.get('spincorps/projets').then((response)=>{
            app.projets = (response.data.data);

            console.log(app.projets[0]);
        })

        if(this.github_data) console.log("github loaded", this.github_data);
        
    },

    methods : {

        sendContact(){
            const _name = document.getElementById("form_name").value;
            const _email = document.getElementById("form_email").value;
            const _message = document.getElementById("form_message").value;

            const btn = document.getElementById("contactbtn");
            btn.value = "Envoyer !"

            const _data = {name: _name, phone: "fez", email: _email, content: _message};

            _instance.post("/spincorps/contacts", {data: _data}).then((response)=>{
                console.log(response);
            })

        }
    

    }
})