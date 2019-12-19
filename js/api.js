class openAPI {
    
    constructor(){
      
       this.apikey = '391fe8552af0150777445c947d22d19e';
    }

   async search(cityName){
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apikey}&units=metric`);
         const result = await response.json();
      if(result.cod === '404'){
         let msg = {
            error : 'Wrong data input'
         };
         return msg;
      }else{
         return result;
      }
    }
    async searchFiveDays(cityName){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${this.apikey}&units=metric`);
       
        const result = await response.json();

        if(result.cod === '404'){
         let msg = {
            error : 'Wrong data input'
         };
         return msg;
      }else{
         return result;
      }
   }

   async getCityLocation(lat, lon){
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}&units=metric`);
     
      const result = await response.json();

         return result;
      }
}

