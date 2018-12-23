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
      this.meta.addTag({property: 'title', content: this.data.title});
      this.meta.addTag({property: 'description', content: this.data.description});
      this.meta.addTag({property: 'image', content: this.data.image});
      this.meta.addTag({property: 'url', content: this.url});
    }
  }

}
