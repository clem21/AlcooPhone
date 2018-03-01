import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';

/**
 * Generated class for the DrinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drink',
  templateUrl: 'drink.html',
})
export class DrinkPage {

  public tab : Array<number>;
  sexe: string;
  age: number;
  poids: number;
  listPage = ListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sexe = this.navParams.get('sexe');
    this.age = this.navParams.get('age');
    this.poids = this.navParams.get('poids');
    if(this.navParams.get('tab') != null) {
        this.tab = this.navParams.get('tab');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrinkPage');
  }

  listing(categ) {
    this.navCtrl.push(this.listPage, {
      categ: categ
    })
  }

}
