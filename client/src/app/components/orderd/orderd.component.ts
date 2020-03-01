import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderd',
  templateUrl: './orderd.component.html',
  styleUrls: ['./orderd.component.css']
})
export class OrderdComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
   setTimeout(()=>{
    this.router.navigate(['/products'])
    },2500)
  }

}
