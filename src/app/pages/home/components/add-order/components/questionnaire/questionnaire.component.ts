import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {

  public questionnaireForm: FormGroup;

  constructor(private _modalCtrl: ModalController,private _fb: FormBuilder) { }

  ngOnInit() {

   /*  this.questionnaireForm = this._fb.group({
      answers:
    }) */
  }


  public cancel() {
    this._modalCtrl.dismiss();
  }

}
