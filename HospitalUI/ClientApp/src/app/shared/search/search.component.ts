import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ISearch } from './isearch';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private _keyWord: string = '';
  searchBy: string = '';
  @Output() searchClicked: EventEmitter<ISearch> = new EventEmitter<ISearch>();


  constructor() { }

  ngOnInit(): void {
  }
  
  public get keyWord() : string {
    return this._keyWord;
  }
  public set keyWord(v : string){
    this._keyWord = v;
  }

  saveSelectedValue(event: any){
    const selectedValue = event.target.value;
    this.searchBy = selectedValue;
  }

  onSearch(){
    this.searchClicked.emit({
      searchBy: this.searchBy,
      keyWord: this.keyWord
    } as ISearch);
  }
}
