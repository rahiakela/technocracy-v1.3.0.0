import {Component, Input, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ShareButtons} from "@ngx-share/core";

@Component({
  selector: 'tech-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  // ref: https://github.com/MurhafSousli/ngx-sharebuttons/wiki/Share-Buttons-Component
  facebookButton;
  googleButton;
  linkedinButton;
  twitterButton;
  envelopeButton;
  whatsappButton;

  @Input()
  data: any;
  @Input()
  shareType: string;

  title: string;
  url: string;
  description: string;

  constructor(public share: ShareButtons, private titleService: Title,
              private meta: Meta) { }

  ngOnInit() {
    // ShareButton(button name [provider], template, classes)
    /*this.facebookButton = new ShareButton(ShareProvider.FACEBOOK, '<i class="fa fa-facebook"></i>', 'facebook');
    this.googleButton = new  ShareButton(ShareProvider.GOOGLEPLUS, '<i class="fa fa-google-plus"></i>', 'google-plus');
    this.linkedinButton = new ShareButton(ShareProvider.LINKEDIN, '<i class="fa fa-linkedin"></i>', 'linkedin');
    this.twitterButton = new ShareButton(ShareProvider.TWITTER, '<i class="fa fa-twitter"></i>', 'twitter');
    this.whatsappButton = new ShareButton(ShareProvider.WHATSAPP, '<i class="fa fa-whatsapp"></i>', 'whatsapp');*/

    // setting page title and meta tag description
    if (this.data) {
      if (this.shareType === 'blog') {
        this.url = `https://www.tecknocracy.com/blog/${this.data._id}`;
      } else if (this.shareType === 'question') {
        this.url = `https://www.tecknocracy.com/question/${this.data._id}`;
      } else {
        this.url = `https://www.tecknocracy.com`;
      }
      this.title = this.data.title;
      this.titleService.setTitle(this.data.title);
      this.description = this.data.description;
      //console.log('Title:', this.data.title);
      //console.log('URL:', this.url);
      //console.log('Description:', this.data.description);
      this.meta.addTag({name: 'description', content: this.data.description});
    }
  }

}
