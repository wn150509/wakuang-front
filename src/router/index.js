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
          path:'/books',
          redirect:'/books/all',
          component: resolve =>require(['../components/page/Books.vue'],resolve),
          meta:{title:'小册'},
          children:[
            //小册二级导航
            {
              path:'/books/all',
              component:resolve =>require(['../components/Bpageson/BAll.vue'],resolve),
              meta:{title:'全部'}
            },
            {
              path:'/books/frontend',
              component: resolve =>require(['../components/Bpageson/BFrontend.vue'],resolve),
              meta:{title:'前端'},
            },
            {
              path:'/books/backend',
              component: resolve =>require(['../components/Bpageson/BBackend.vue'],resolve),
              meta:{title:'后端'},
            },
            {
              path:'/books/mobile',
              component: resolve =>require(['../components/Bpageson/BMobile.vue'],resolve),
              meta:{title:'移动开发'},
            },
            {
              path:'/books/blockchain',
              component: resolve =>require(['../components/Bpageson/BBlockchain.vue'],resolve),
              meta:{title:'区块链'},
            },
            {
              path:'/books/general',
              component: resolve =>require(['../components/Bpageson/BGeneral.vue'],resolve),
              meta:{title:'通用'},
            }
          ]
        },
        {
          path:'/repos',
          redirect:'/repos/frontend/framework',
          component: resolve =>require(['../components/page/Repos.vue'],resolve),
          meta:{title:'开源库'},
          children:[
            {
              path:'/repos/frontend/framework',
              component:resolve =>require(['../components/Rpageson/Frontend/FrameWork.vue'],resolve),
              meta:{title:'前端/js/开发框架'}
            },
            {
              path:'/repos/frontend/cframwork',
              component:resolve =>require(['../components/Rpageson/Frontend/CFramework.vue'],resolve),
              meta:{title:'前端/css/开发框架'}
            },
            {
              path:'/repos/frontend/clibrary',
              component:resolve =>require(['../components/Rpageson/Frontend/CLibrary.vue'],resolve),
              meta:{title:'前端/css/实用库'}
            },
            {
              path:'/repos/frontend/cflash',
              component:resolve =>require(['../components/Rpageson/Frontend/CFlash.vue'],resolve),
              meta:{title:'前端/css/动画'}
            },
            {
              path:'/repos/frontend/vuicomponent',
              component:resolve =>require(['../components/Rpageson/Frontend/VUicomponent.vue'],resolve),
              meta:{title:'前端/vue/UI组件'}
            },
            {
              path:'/repos/frontend/vframework',
              component:resolve =>require(['../components/Rpageson/Frontend/VFramework.vue'],resolve),
              meta:{title:'前端/vue/开发框架'}
            },
            {
              path:'/repos/frontend/aapplications',
              component:resolve =>require(['../components/Rpageson/Frontend/AApplications.vue'],resolve),
              meta:{title:'前端/angular/应用案例'}
            },
            {
              path:'/repos/frontend/alibrary',
              component:resolve =>require(['../components/Rpageson/Frontend/ALibrary.vue'],resolve),
              meta:{title:'前端/angular/实用库'}
            },
            {
              path:'/repos/frontend/auicomponent',
              component:resolve =>require(['../components/Rpageson/Frontend/AUIcomponent.vue'],resolve),
              meta:{title:'前端/angular/UI组件'}
            },
            {
              path:'/repos/frontend/rapplications',
              component:resolve =>require(['../components/Rpageson/Frontend/RApplications.vue'],resolve),
              meta:{title:'前端/react/应用案例'}
            },
            {
              path:'/repos/frontend/rframework',
              component:resolve =>require(['../components/Rpageson/Frontend/RFramework.vue'],resolve),
              meta:{title:'前端/react/开发框架'}
            },
            {
              path:'/repos/frontend/ruicomponent',
              component:resolve =>require(['../components/Rpageson/Frontend/RUIcomponent.vue'],resolve),
              meta:{title:'前端/react/UI组件'}
            },
            {
              path:'/repos/frontend/ogrunt',
              component:resolve =>require(['../components/Rpageson/Frontend/OGrunt.vue'],resolve),
              meta:{title:'前端/其他/Grunt'}
            },
            {
              path:'/repos/frontend/ocalendar',
              component:resolve =>require(['../components/Rpageson/Frontend/Ocalendar.vue'],resolve),
              meta:{title:'前端/其他/日历'}
            },
            {
              path:'/repos/frontend/ovisualization',
              component:resolve =>require(['../components/Rpageson/Frontend/Ovisualization.vue'],resolve),
              meta:{title:'前端/其他/数据可视化'}
            },
            {
              path:'/repos/android/aarvr',
              component:resolve =>require(['../components/Rpageson/Android/Aarvr.vue'],resolve),
              meta:{title:'android/AR&VR'}
            },
            {
              path:'/repos/android/alist',
              component:resolve =>require(['../components/Rpageson/Android/AList.vue'],resolve),
              meta:{title:'android/菜单'}
            },
            {
              path:'/repos/android/agesture',
              component:resolve =>require(['../components/Rpageson/Android/AGesture.vue'],resolve),
              meta:{title:'android/手势交互'}
            },
            {
              path:'/repos/android/alistview',
              component:resolve =>require(['../components/Rpageson/Android/AListView.vue'],resolve),
              meta:{title:'android/ListView'}
            },
            {
              path:'/repos/android/anav',
              component:resolve =>require(['../components/Rpageson/Android/ANav.vue'],resolve),
              meta:{title:'android/导航'}
            },
            {
              path:'/repos/android/aviewanimation',
              component:resolve =>require(['../components/Rpageson/Android/AViewAnimation.vue'],resolve),
              meta:{title:'android/视图动画'}
            },
            {
              path:'/repos/ios/ilist',
              component:resolve =>require(['../components/Rpageson/iOS/IList.vue'],resolve),
              meta:{title:'ios/菜单'}
            },
            {
              path:'/repos/ios/iarvr',
              component:resolve =>require(['../components/Rpageson/iOS/Iarvr.vue'],resolve),
              meta:{title:'ios/AR&VR'}
            },
            {
              path:'/repos/ios/igesture',
              component:resolve =>require(['../components/Rpageson/iOS/IGesture.vue'],resolve),
              meta:{title:'ios/手势交互'}
            },
            {
              path:'/repos/ios/inav',
              component:resolve =>require(['../components/Rpageson/iOS/INav.vue'],resolve),
              meta:{title:'ios/导航'}
            },
            {
              path:'/repos/ios/iviewanimation',
              component:resolve =>require(['../components/Rpageson/iOS/IViewAnimation.vue'],resolve),
              meta:{title:'ios/视图动画'}
            },
            {
              path:'/repos/python/wdjango',
              component:resolve =>require(['../components/Rpageson/Python/WDjango.vue'],resolve),
              meta:{title:'python/web/django'}
            },
            {
              path:'/repos/python/wflask',
              component:resolve =>require(['../components/Rpageson/Python/WFlask.vue'],resolve),
              meta:{title:'python/web/flask'}
            },
            {
              path:'/repos/python/wtornado',
              component:resolve =>require(['../components/Rpageson/Python/WTornado.vue'],resolve),
              meta:{title:'python/web/tornado'}
            },
            {
              path:'/repos/python/scientificcalculation',
              component:resolve =>require(['../components/Rpageson/Python/ScientificCalculation.vue'],resolve),
              meta:{title:'python/web/科学计算'}
            },
            {
              path:'/repos/python/machinelearning',
              component:resolve =>require(['../components/Rpageson/Python/MachineLearning.vue'],resolve),
              meta:{title:'python/web/机器学习'}
            }
          ]
        },
        {
          path:'/events',
          redirect:'/events/all',
          component: resolve =>require(['../components/page/Events.vue'],resolve),
          meta:{title:'活动'},
          children:[
            //活动二级导航
            {
              path:'/events/all',
              component: resolve =>require(['../components/Epageson/EAll.vue'],resolve),
              meta:{title:'热门活动'}
            },
            {
              path:'/events/beijing',
              component: resolve =>require(['../components/Epageson/EBeijing.vue'],resolve),
              meta:{title:'北京'}
            },
            {
              path:'/events/shanghai',
              component: resolve =>require(['../components/Epageson/EShanghai.vue'],resolve),
              meta:{title:'上海'}
            },
            {
              path:'/events/guangzhou',
              component: resolve =>require(['../components/Epageson/EGuangzhou.vue'],resolve),
              meta:{title:'广州'}
            },
            {
              path:'/events/shenzhen',
              component: resolve =>require(['../components/Epageson/EShenzhen.vue'],resolve),
              meta:{title:'深圳'}
            },
            {
              path:'/events/hangzhou',
              component: resolve =>require(['../components/Epageson/EHangzhou.vue'],resolve),
              meta:{title:'杭州'}
            },
            {
              path:'/events/chengdu',
              component: resolve =>require(['../components/Epageson/EChengdu.vue'],resolve),
              meta:{title:'成都'}
            },
            {
              path:'/events/changsha',
              component: resolve =>require(['../components/Epageson/EChangsha.vue'],resolve),
              meta:{title:'长沙'}
            },
            {
              path:'/events/chongqing',
              component: resolve =>require(['../components/Epageson/EChongqing.vue'],resolve),
              meta:{title:'重庆'}
            },
            {
              path:'/events/nanjing',
              component: resolve =>require(['../components/Epageson/ENanjing.vue'],resolve),
              meta:{title:'南京'}
            },
            {
              path:'/events/suzhou',
              component: resolve =>require(['../components/Epageson/Esuzhou.vue'],resolve),
              meta:{title:'苏州'}
            },
            {
              path:'/events/xian',
              component: resolve =>require(['../components/Epageson/Exian.vue'],resolve),
              meta:{title:'西安'}
            },
            {
              path:'/events/xiamen',
              component: resolve =>require(['../components/Epageson/Exiamen.vue'],resolve),
              meta:{title:'厦门'}
            },
            {
              path:'/events/fuzhou',
              component: resolve =>require(['../components/Epageson/EFuzhou.vue'],resolve),
              meta:{title:'福州'}
            },
            {
              path:'/events/wuhan',
              component: resolve =>require(['../components/Epageson/Ewuhan.vue'],resolve),
              meta:{title:'武汉'}
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
          path:'/collections',
          redirect:'/collections/all',
          component: resolve =>require(['../components/page/Collections.vue'],resolve),
          meta:{title:'收藏'},
          children:[
            {
              path:'/collections/all',
              component: resolve =>require(['../components/Cpageson/CAll.vue'],resolve),
              meta:{title:'全部'}
            },
            {
              path:'/collections/ios',
              component: resolve =>require(['../components/Cpageson/CiOS.vue'],resolve),
              meta:{title:'iOS'}
            },
            {
              path:'/collections/android',
              component: resolve =>require(['../components/Cpageson/CAndroid.vue'],resolve),
              meta:{title:'Android'}
            },
            {
              path:'/collections/frontend',
              component: resolve =>require(['../components/Cpageson/CFrontend.vue'],resolve),
              meta:{title:'前端'}
            },
            {
              path:'/collections/design',
              component: resolve =>require(['../components/Cpageson/CDesign.vue'],resolve),
              meta:{title:'设计'}
            },
            {
              path:'/collections/product',
              component: resolve =>require(['../components/Cpageson/CProduct.vue'],resolve),
              meta:{title:'产品'}
            },
            {
              path:'/collections/backend',
              component: resolve =>require(['../components/Cpageson/CBackend.vue'],resolve),
              meta:{title:'后端'}
            }
          ]
        },
        {
          path:'/collection/:id',
          component: resolve =>require(['../components/page/Collection.vue'],resolve),
          meta:{title:'某个收藏'}
        },
        {
          path:'/user/:id ',
          redirect:'/user/:id/activities',
          component:resolve =>require(['../components/dropdownpage/User.vue'],resolve),
          meta:{title:'个人主页'},
          children:[
            //个人主页二级导航
            {
              path:'/user/:id/activities',
              component:resolve =>require(['../components/Upageson/UActivities.vue'],resolve),
              meta:{title:'动态'}
            },
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
              path:'/user/:id/shares',
              component:resolve =>require(['../components/Upageson/UShares.vue'],resolve),
              meta:{title:'分享'}
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
              path:'/user/:id/books',
              component:resolve =>require(['../components/Upageson/UBooks.vue'],resolve),
              meta:{title:'小册'}
            },
            {
              path: '/user/:id/collections',
              component: resolve => require(['../components/Upageson/UCollections.vue'], resolve),
              meta: {title: '收藏集'}
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
          redirect:'/ou/:id/activities',
          component:resolve =>require(['../components/page/OtherUsers.vue'],resolve),
          meta:{title:'某个作者'},
          children:[
            //个人主页二级导航
            {
              path:'/ou/:id/activities',
              component:resolve =>require(['../components/OUpageson/OUActivities.vue'],resolve),
              meta:{title:'动态'}
            },
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
              path:'/ou/:id/shares',
              component:resolve =>require(['../components/OUpageson/OUShares.vue'],resolve),
              meta:{title:'分享'}
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
              path:'/ou/:id/books',
              component:resolve =>require(['../components/OUpageson/OUBooks.vue'],resolve),
              meta:{title:'小册'}
            },
            {
              path: '/ou/:id/collections',
              component: resolve => require(['../components/OUpageson/OUCollections.vue'], resolve),
              meta: {title: '收藏集'}
            },
            {
              path:'/ou/:id/tags',
              component:resolve =>require(['../components/OUpageson/OUTags.vue'],resolve),
              meta:{title:'关注'}
            }
          ]
        },
        {
          path:'/editor/drafts',
          component:resolve =>require(['../components/dropdownpage/Editor.vue'],resolve),
          meta:{title:'草稿'}
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
