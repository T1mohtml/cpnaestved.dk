function show(page) {
  let page_spil = document.getElementById('page_spil');
  let page_video = document.getElementById('page_video');
  let page_mineting = document.getElementById('page_mineting');
  
  page_spil.style.display = 'none';
  page_video.style.display = 'none';
  page_mineting.style.display = 'none';
  
  switch (page) {
    case 'spil': 
      page_spil.style.display = 'block';
      break;
    case 'video':
      page_video.style.display = 'block';
      break;
    case 'mineting':
      page_mineting.style.display = 'block';
      break;
  }
}

function mystik() {
  alert('dette er en besked');
}