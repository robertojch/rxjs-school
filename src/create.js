import { displayLog } from './utils';
import { Observable } from 'rxjs';

export default () => {
    /** start coding */
    const hello = new Observable(observer => {
        observer.next('Hello');
        setTimeout(()=>{
            observer.next('World');
            observer.complete();
        }, 2000);
        
    });
    
    const observer = {
        next: evt => displayLog(evt),
        error: err => console.err("[ERR] -",err),
        complete: () => displayLog("[DONE]")
    }
    const subscribe = hello.subscribe(observer);
    const subscribe2 = hello.subscribe(observer);
    subscribe.unsubscribe();
    /** end coding */
}