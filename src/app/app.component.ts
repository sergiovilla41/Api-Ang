import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  viewcart: boolean=false;
  isDarkTheme: boolean = false;
onToggleCart(){
this.viewcart = !this.viewcart
}
onChange (newValue: boolean): void{
  console.log(newValue);
}

}
