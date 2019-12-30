import { updateDisplay } from './utils';
import { fromEvent, from } from 'rxjs';
import { map, tap, pairwise } from 'rxjs/operators';

export default () => {
    /** start coding */
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt)),
        pairwise(),  // devuelve en un array el valor actual y previo  ejemplo [289,290]
        tap(evt => console.log("after [scroll]: ", evt)),
        tap(([previous, current]) => {
            updateDisplay(current > previous ? 'DESC' : 'ASC');
        }),
        map(([previous, current]) => current)
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        })
    )

    //subscribe to scroll progress to paint a progress bar
    const subscription = scrollProgress$.subscribe(updateProgressBar);

    const demof$ = from(['Hola', 'Roberto', 'Carlos', 'Jacinto', 'Chirinos']);
    const demoSubscription = demof$.pipe(tap(evt => console.log('before tap evt', evt)),
    pairwise()
    ).subscribe(data => {
        console.log('after pairwise ',data);
    });

    /** end coding */
}