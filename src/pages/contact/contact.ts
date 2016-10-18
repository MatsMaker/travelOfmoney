import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Sql } from '../../providers/Sql';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  private storage: Sql;
  public personList: Array<Object>;

  public constructor(private navCtrl: NavController, private sql: Sql) {
    this.storage = new Sql();
    this.storage.query("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)");
    this.personList = [];
  }

  public onPageLoaded() {
    this.refresh();
  }

  public add() {
    this.storage.query("INSERT INTO people (firstname, lastname) VALUES (?, ?)", ["Nic", "Raboy"]).then((data) => {
      this.personList.push({
        "firstname": "Nic",
        "lastname": "Raboy"
      });
    }, (error) => {
      console.log(error);
    });
  }

  public refresh() {
    this.storage.query("SELECT * FROM people").then((data) => {
      if (data.res.rows.length > 0) {
        this.personList = [];
        for (let i = 0; i < data.res.rows.length; i++) {
          this.personList.push({
            "id": data.res.rows.item(i).id,
            "firstname": data.res.rows.item(i).firstname,
            "lastname": data.res.rows.item(i).lastname,
          });
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

}
