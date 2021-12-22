function createGrid(n){
    const grid = document.querySelector('#grid');
    grid.style.gridTemplateColumns = 'repeat('+n+','+'1fr)'
    for(let row=0;row<n;row++){
        for(let column=0;column<n;column++){  
            let element = document.createElement('div')
            element.classList.add('gridElement');
            element.style.width = 700/n;
            element.style.height = 700/n;      
            grid.appendChild(element);
        }
    }

    document.querySelector('label').textContent = n.toString()+' x '+n.toString();

    let gridElements = document.querySelectorAll('.gridElement');
    gridElements.forEach(gridElement => gridElement.addEventListener('mouseover', hover));
}

function hover(e){
    if(mode == 'singleColor')
        e.target.style.backgroundColor = color;
    else if(mode == 'eraser')
        e.target.style.backgroundColor = '#ffffff';
    else if(mode == 'multiColor'){
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = 'rgb('+randomR+','+randomG+','+randomB+')';
    }
}

function clearGrid(){
    document.querySelectorAll('.gridElement').forEach(element => element.remove());
}

function newGrid(e){
    let prev_n = n;
    n = prompt('Enter the number of squares you need on one side: ');
    if(!n){
        n = prev_n;
        return;
    }
    while(n>=100){
        n = prompt('Enter a number under 100.');
    }
    clearGrid();
    createGrid(n);
}

function changeColor(){
    mode = 'singleColor';
    color = this.value;
    let r = document.querySelector(':root');
    r.style.setProperty('--color', color);
}

function multiColor(){
    mode = 'multiColor';
}

function singleColor(){
    mode = 'singleColor';
}

function eraser(){
    mode = 'eraser';
}

let color='#008b8b';
let mode = 'singleColor';
let n=16;

createGrid(n);

document.querySelector('#newGrid').addEventListener('click', newGrid);
document.querySelector('#colorPicker').addEventListener('change', changeColor);
document.querySelector('#multiColor').addEventListener('click', multiColor);
document.querySelector('#singleColor').addEventListener('click', singleColor);
document.querySelector('#eraser').addEventListener('click', eraser);