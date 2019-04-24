import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', loadChildren: './pages/posts/posts.module#PostsPageModule' },
  { path: 'posts/:id', loadChildren: './pages/post/post.module#PostPageModule' },

  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  // { path: 'posts', loadChildren: './pages/posts/posts.module#PostsPageModule' },
  // { path: 'post', loadChildren: './pages/post/post.module#PostPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
