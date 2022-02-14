// Excercises from "https://learn.javascript.ru/call-apply-decorators"


//---------- Spy decorator

function work(a, b) {
    console.log( a + b ); // произвольная функция или метод
}
function spy(func){
    function spyInner(a,b){
        spyInner.calls.push([a,b]);
        return func(a,b);
    }
    spyInner.calls = [];
    return spyInner;
}
// создаём обёртки
work = spy(work);
// Проверка
// work(1, 2); // 3
// work(4, 5); // 9
// for (let args of work.calls) {
//     console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
// }


//----------- Delay decorator

function f(x) {
    console.log(x);
}
function delay(func, delay){
    return (x) => {
        setTimeout(() => (func(x)),delay)
    };

}
// создаём обёртки
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);
// Проверка
// f1000("test"); // показывает "test" после 1000 мс
// f1500("test"); // показывает "test" после 1500 мс


//------------ Debounce decorator
function debounce(func, time){
    let cd = false;
    return function(x){
        if (cd) return;
        cd = true;
        setTimeout(()=> cd = false, time);
        return func(x);
    }
}
// Обертка
let deb = debounce(console.log, 1000);
//Проверка
// deb('First'); // выполняется немедленно
// deb('Second'); // проигнорирован
// setTimeout( () => deb(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout( () => deb(4), 1100); // выполняется
// setTimeout( () => deb(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)