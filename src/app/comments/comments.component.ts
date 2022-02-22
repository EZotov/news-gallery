import { Component, Input} from '@angular/core';

@Component(
  {
    selector : 'commentsList',
    templateUrl : './comments.component.html',
    styleUrls : ['./comments.component.scss']
  }
)

export class CommentsList {
  @Input() currentNew : any;
}
