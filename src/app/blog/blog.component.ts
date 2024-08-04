import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {}
