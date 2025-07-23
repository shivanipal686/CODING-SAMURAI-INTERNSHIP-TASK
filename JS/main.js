// toggle background active 
const bannerNavigator = name => {
    let items = document.querySelectorAll('.item');
    let descriptions = document.querySelectorAll('.description');
    items.forEach(item => {
        if(item.classList.contains(name)){
            item.classList.add('active');
        }
    });
    descriptions.forEach(description => {
        description.classList.remove('active');
        if(description.classList.contains(name)){
            description.classList.add('active');
        }
    });
};

//close the banner
const bannerClose = () => {
    let items = document.querySelectorAll('.item');
    let descriptions = document.querySelectorAll('.description');
    items.forEach(item => {
        item.classList.remove('active');
    });
    descriptions.forEach(description => {
        description.classList.remove('active');
    });
};

// switch background
window.addEventListener('load', () => {
    const buttons = document.querySelectorAll('.name');
    const close = document.querySelector('.close');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            buttons.forEach(el => {
                el.classList.remove('active');
            });
            this.classList.add('active');
            close.classList.add('active');
            bannerNavigator(this.getAttribute('data-target'));
        });
    });

    close.addEventListener('click', function (e){
        e.preventDefault();
        close.classList.remove('active');
        buttons.forEach(el =>{
            el.classList.remove('active');
        });
        bannerClose();
    });
});
