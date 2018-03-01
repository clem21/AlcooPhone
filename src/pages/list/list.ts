import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import { Http } from '@angular/http';
import { DrinkPage } from '../drink/drink';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  public xmlItems : any;
  public categ : string;
  public tab : Array<number>;
  drinkPage = DrinkPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.categ = this.navParams.get('categ');
    this.tab = [];
  }

  ionViewWillEnter()
  {
     this.loadXML();
  }

  loadXML()
  {
     this.http.get('/assets/data/alcool.xml')
     .map(res => res.text())
     .subscribe((data)=>
     {
        this.parseXML(data)
        .then((data)=>
        {
           this.xmlItems = data;
        });
     });
  }

  parseXML(data)
  {
    var that = this;
     return new Promise(resolve =>
     {
       var listPage = ListPage;
        var k,
            clem,
            sous_clem,
            arr    = [],
            parser = new xml2js.Parser(
            {
               trim: true,
               explicitArray: true
            });
        parser.parseString(data, function (err, result)
        {
           var obj = result;
           for(k in obj)
           {
              //i++;
              var item = obj[k];
              for(clem of item.category)
              {
                for(sous_clem of clem.item) {
                  that.tab[sous_clem.$.id] = 0;
                  if(clem.name[0] == that.categ) {
                    arr.push({
                      id     : sous_clem.$.id,
                      name   : sous_clem.name[0],
                      degre  : sous_clem.degre[0]
                    });
                  }
                }
              }   
           }
           resolve(arr);
        });
     });
  }

  remove(item_id){
    if(this.tab[item_id] > 0) {
      this.tab[item_id] = (this.tab[item_id] - 1);
    }
  }

  add(item_id){
    if(this.tab[item_id] !< 10) {
      this.tab[item_id] = (this.tab[item_id] + 1);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  valid() {
    this.navCtrl.push(this.drinkPage, {
      tab: this.tab
    })
  }

}
