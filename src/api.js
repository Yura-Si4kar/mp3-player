    const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'db191aa41fmsh276ac3f74775cf4p1faa17jsn4189d7105c1d',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    return fetch(url, options).then((res) => res.json()).then((data) => console.log(data));