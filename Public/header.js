 // header area starts.....................
 const staticHeader = document.querySelector('.static-header');
 const fixedHeader = document.querySelector('.fixed-header');

 window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > staticHeader.offsetHeight) {
    fixedHeader.classList.remove('hidden');
    fixedHeader.style.transform = 'translateY(0)';
   } else {
     fixedHeader.classList.add('hidden');
     fixedHeader.style.transform = 'translateY(-100%)';
   }
 });
   //header area ends here