import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CardData{
  id: number;
  icon?: string;
  description: string;
  selected?: boolean;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards: CardData[] =[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<CardData[]>('assets/data.json').subscribe(data =>{
      this.cards = data;
    });
  }
  toggleCard(card: CardData){
    card.selected = !card.selected;
  }

}