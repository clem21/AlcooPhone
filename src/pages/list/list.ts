import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import { Http } from '@angular/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
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
     return new Promise(resolve =>
     {
        var k,
            arr    = [],
            parser = new xml2js.Parser(
            {
               trim: true,
               explicitArray: true
            });

        parser.parseString(data, function (err, result)
        {
           console.log(data);
           var obj = result;
           for(k in obj)
           {
              var item = obj[k];
              arr.push({
                 name   : item.name,
                 degre  : item.degre          
              });
              console.log(item);
           }

           resolve(obj);
        });
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
