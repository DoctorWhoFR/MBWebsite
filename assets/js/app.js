var _instance = null;

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue !',
        github_data: null,
        languages: []
    },

    mounted: () => {

        _instance = axios.create({
            baseURL: 'https://qcorps.herokuapp.com/api/v1/',
            timeout: 3000
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
        
        if(this.github_data) console.log("github loaded", this.github_data);
        
    }
})