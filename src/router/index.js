import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      //首页组件
      path:'/',
      redirect:'/timeline',
      component: resolve =>require(['../components/commons/Home.vue'],resolve),
      meta:{title: '回首页'},
      children:[
        {
          //首页
          path:'/timeline',
          redirect:'/timeline/subscribe',
          component: resolve =>require(['../components/page/Index.vue'],resolve),
          meta:{title:'首页'},
          children:[
            //首页二级导航
            {
              path:'/timeline/subscribe',
              component: resolve =>require(['../components/Ipageson/TSubscribe.vue'],resolve),
              meta:{title:'我关注的'}
            },
            {
              path:'/timeline/android',
              component: resolve =>require(['../components/Ipageson/TAndroid.vue'],resolve),
              meta:{title:'Android'}
            },
            {
              path:'/timeline/frontend',
              component: resolve =>require(['../components/Ipageson/TFrontend.vue'],resolve),
              meta:{title:'前端'}
            },
            {
              path:'/timeline/ios',
              component: resolve =>require(['../components/Ipageson/Tios.vue'],resolve),
              meta:{title:'iOS'}
            },
            {
              path:'/timeline/backend',
              component: resolve =>require(['../components/Ipageson/TBackend.vue'],resolve),
              meta:{title:'后端'}
            },
            {
              path:'/timeline/design',
              component: resolve =>require(['../components/Ipageson/TDesign.vue'],resolve),
              meta:{title:'设计'}
            },
            {
              path:'/timeline/product',
              component: resolve =>require(['../components/Ipageson/TProduct.vue'],resolve),
              meta:{title:'产品'}
            },
            {
              path:'/timeline/freebie',
              component: resolve =>require(['../components/Ipageson/TFreebie.vue'],resolve),
              meta:{title:'工具资源'}
            },
            {
              path:'/timeline/article',
              component: resolve =>require(['../components/Ipageson/TArticle.vue'],resolve),
              meta:{title:'阅读'}
            },
            {
              path:'/timeline/ai',
              component: resolve =>require(['../components/Ipageson/Tai.vue'],resolve),
              meta:{title:'人工智能'}
            },
            {
              path:'/timeline/devops',
              component: resolve =>require(['../components/Ipageson/TDevops.vue'],resolve),
              meta:{title:'运维'}
            }
          ]
        },
        {
          path:'/activities',
          redirect:'/activities/posts',
          component: resolve =>require(['../components/page/Activities.vue'],resolve),
          meta:{title:'动态'},
          children:[
            //动态二级导航
            {
              path:'/activities/posts',
              component:resolve =>require(['../components/Apageson/APosts.vue'],resolve),
              meta:{title:'文章'}
            },
            {
              path:'/activities/pins',
              component:resolve =>require(['../components/Apageson/APins.vue'],resolve),
              meta:{title:'沸点'}
            }
          ]
        },
        {
          path:'/topics',
          component:resolve =>require(['../components/page/Topics.vue'],resolve),
          meta:{title:'话题'}
        },
        {
          path:'/search',
          redirect:'/search/articles',
          component: resolve =>require(['../components/page/Search.vue'],resolve),
          meta:{title:'搜索'},
          children:[
            //搜索二级导航
            {
              path:'/search/articles',
              component: resolve =>require(['../components/SearchPage/ArticlesPage.vue'],resolve),
              meta:{title:'文章'}
            },
            {
              path:'/search/labels',
              component: resolve =>require(['../components/SearchPage/LabelPage.vue'],resolve),
              meta:{title:'标签'}
            },
            {
              path:'/search/users',
              component: resolve =>require(['../components/SearchPage/UserPage.vue'],resolve),
              meta:{title:'作者'}
            },
          ]
        },
        {
          //文章详情
          path:'/p/:id',
          component: resolve =>require(['../components/page/Article.vue'],resolve),
          meta:{title:'文章详情'}
        },
        {
          path:'/tag/:id',
          component:resolve =>require(['../components/page/Label.vue'],resolve),
          meta:{title:'某个标签页'}
        },
        {
          path:'/subscribe',
          redirect:'/subscribe/all',
          component: resolve =>require(['../components/page/Subscribe.vue'],resolve),
          meta:{title:'关注'},
          children:[
            //关注二级导航
            {
              path:'/subscribe/subscribed',
              component: resolve =>require(['../components/Spageson/Subscribed.vue'],resolve),
              meta:{title:'已关注标签'}
            },
            {
              path:'/subscribe/all',
              component:resolve =>require(['../components/Spageson/SAll.vue'],resolve),
              meta:{title:'全部标签'}
            }
          ]
        },
        {
          path:'/topic/:id',
          redirect:'topic/:id/tLike',
          component: resolve =>require(['../components/page/Collection.vue'],resolve),
          meta:{title:'某个话题'}
        },
        {
          path:'/user/:id ',
          redirect:'/user/:id/posts',
          component:resolve =>require(['../components/dropdownpage/User.vue'],resolve),
          meta:{title:'个人主页'},
          children:[
            //个人主页二级导航
            {
              path:'/user/:id/posts',
              component:resolve =>require(['../components/Upageson/UPosts.vue'],resolve),
              meta:{title:'专栏'}
            },
            {
              path:'/user/:id/pins',
              component:resolve =>require(['../components/Upageson/UPins.vue'],resolve),
              meta:{title:'沸点'}
            },
            {
              path:'/user/:id/likes',
              component:resolve =>require(['../components/Upageson/ULikes.vue'],resolve),
              meta:{title:'文章赞'}
            },
            {
              path:'/user/:id/praise',
              component:resolve =>require(['../components/Upageson/UPraise.vue'],resolve),
              meta:{title:'沸点赞'}
            },
            {
              path:'/user/:id/tags',
              component:resolve =>require(['../components/Upageson/UTags.vue'],resolve),
              meta:{title:'关注'}
            }
          ]
        },
        {
          path:'/ou/:id',
          redirect:'/ou/:id/posts',
          component:resolve =>require(['../components/page/OtherUsers.vue'],resolve),
          meta:{title:'某个作者'},
          children:[
            //个人主页二级导航
            {
              path:'/ou/:id/posts',
              component:resolve =>require(['../components/OUpageson/OUPosts.vue'],resolve),
              meta:{title:'专栏'}
            },
            {
              path:'/ou/:id/pins',
              component:resolve =>require(['../components/OUpageson/OUPins.vue'],resolve),
              meta:{title:'沸点'}
            },
            {
              path:'/ou/:id/likes',
              component:resolve =>require(['../components/OUpageson/OULikes.vue'],resolve),
              meta:{title:'文章赞'}
            },
            {
              path:'/ou/:id/praise',
              component:resolve =>require(['../components/OUpageson/OUPraise.vue'],resolve),
              meta:{title:'沸点赞'}
            },
            {
              path:'/ou/:id/tags',
              component:resolve =>require(['../components/OUpageson/OUTags.vue'],resolve),
              meta:{title:'关注'}
            }
          ]
        },
        {
          path:'/settings',
          redirect:'/settings/person',
          component:resolve =>require(['../components/page/Setting.vue'],resolve),
          meta:{title:'设置'},
          children:[
            {
              path:'/settings/person',
              component:resolve =>require(['../components/setpageson/PersonSet.vue'],resolve),
              meta:{title:'个人资料'}
            },
            {
              path:'/settings/accountset',
              component:resolve =>require(['../components/setpageson/AccountManager.vue'],resolve),
              meta:{title:'账号管理'}
            }
          ]
        }
      ]
    },
    {
      //写文章
      path:'/write',
      component: resolve =>require(['../components/page/Write.vue'],resolve),
      meta:{title:'写文章'}
    },
    {
      //登陆
      path:'/sign_in',
      component: resolve =>require(['../components/page/SignIn.vue'],resolve),
      meta:{title:'登陆'}
    },
    {
      //注册
      path:'/sign_up',
      component: resolve=>require(['../components/page/SignUp.vue'],resolve),
      meta:{title:'注册'}
    }
  ]
})
