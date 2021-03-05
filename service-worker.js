/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","d63a1fdbc87ce4d78076f89219edbd02"],["/CSS-1/index.html","afa9e1fe9b363e8e49948afeb2cc5eff"],["/CSS-2/index.html","bdb72a4bcf1eb6087f22c3be9d9133bc"],["/CSS-3/index.html","fee463297992d7d9286ffcc727e6cb3a"],["/CSS-4/index.html","3e4ae230e3a2ffaf7d05b5a69a290769"],["/CSS-5/index.html","ef9791d9f8ce11a1f893a55e6146fb24"],["/CSS-6/index.html","bd09bcfa67fe63a1462ecc4212b4d841"],["/CSS-7/index.html","8f7510df3885aaeb31a10d6636105bf0"],["/CSS-8/index.html","3b16942fbd653ab258c013e76716b276"],["/about-site/index.html","17fac81e0e7fbdfa8f8a882439a9eaca"],["/about/index.html","aaeadf3e98d27518be6324a592835446"],["/archives/2020/12/index.html","86cc29b7eaefda96910ff85c10724858"],["/archives/2020/12/page/2/index.html","9cef5c2657c559d709452fbc18d75519"],["/archives/2020/index.html","5218f07b4acf3ed910f4efc3305e70a8"],["/archives/2020/page/2/index.html","aee2bfedc99dfda31c51d90d242bb012"],["/archives/2021/01/index.html","e3e7a76bfa73000a8aba744993c78062"],["/archives/2021/01/page/2/index.html","cb86bf479b50c8f851cf2a58e44d9fd3"],["/archives/2021/02/index.html","d534908ee788093b486eaac87a5c0597"],["/archives/2021/03/index.html","305a318d011194e0116ef652cde3809b"],["/archives/2021/index.html","3e8e782046dc9a9b3e040259f2c592b1"],["/archives/2021/page/2/index.html","7f7421033b64db41088eeb457cf55173"],["/archives/2021/page/3/index.html","00f90a52cc6cf4f4687141fa0e4774ba"],["/archives/index.html","033230840d360d086e56559ce1f78be7"],["/archives/page/2/index.html","05f634c33628a4bd6d52cf5f243369e6"],["/archives/page/3/index.html","f5a2cbc64aa63b40345785af7d9b074a"],["/archives/page/4/index.html","9a9cb788ade7c6a1ee8a25120ef12d43"],["/categories/index.html","6ded245838a9b04d8a8bb8b23c4a3864"],["/categories/其他/index.html","b1b7830174a82806c0ac328871181a57"],["/categories/分享/index.html","cf592dacdde6016cdb25a66095299af6"],["/categories/分享/建議/index.html","f01480abf1c34bc5f732dfdf2d857279"],["/categories/教學/000webhost/index.html","482ffacd205a947dd1709811648e0efa"],["/categories/教學/Dark-mode/index.html","46225505aa65fdb9ea58e0da1809c907"],["/categories/教學/Windows/index.html","0a7e746bfc4525fbcf4c36a0f4b14f11"],["/categories/教學/index.html","5721e32c94e9d9d07882ca09571f6d70"],["/categories/教學/page/2/index.html","61b99c4cd874ab6abaf99a002f4a94c1"],["/categories/教學/軟件/index.html","195686cccbd5f2e9877294dbcc9d32b5"],["/categories/自學/PHP/index.html","8fead74c83c445a320337e429c2108ec"],["/categories/自學/index.html","47646cb89fd915519aba8e2f2b1e0bc0"],["/categories/解難/index.html","ee2350e85599f0cbb530807a81cf8cc1"],["/contact/index.html","d19adc324d420faf00f279f0582d61de"],["/css/commentsbar.css","55c9a874ac3c69068a422061e35b345d"],["/css/custom.css","49f9a2250bf917b51c134e5aebbdea2f"],["/css/index.css","b7a25665fdf7bab292c9451349ca5690"],["/css/prism-line-numbers.css","0810c0e4aa6528786cf1253de32ea115"],["/css/prism.css","f2c5a96cd675919b8b29a8dd667b6104"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/disqus/index.html","20f3262d32072dc354af5dbcde193fe6"],["/files/demo-google-404/index.html","6f488b7f4c33d1f729a718d3307783bd"],["/files/demo/demo-dark.css","80436867383c0cb7eb717d1939a4dec9"],["/files/demo/demo-light.css","33ff419e72372c841a867f9f5586129f"],["/files/demo/index.html","8c32566065a4c188651dcbde5b0c2b7c"],["/font/LXGWWenKai-Medium.ttf","eb314338fb26965e95e89dd229ee9700"],["/friendcircle/index.html","e7270d0c63fc8adb5556a1d734af672c"],["/friends/index.html","bb7a68e382c9a5aaba6d707d75a0de3b"],["/getip/index.html","185ba83102058357046eb278b365f5c3"],["/home/configs.js","20310bf56d2815e8422d417e657341f0"],["/home/index.html","a6e409b5ff72a10a8d7d91045a7c8565"],["/home/onLoad.js","c327548c3d72ad87404914aeedcc2673"],["/home/res/apps/browser/index.css","4cbca48bd4945f1cf2605afe3a6c9815"],["/home/res/apps/browser/index.html","661c27053534775802b86381ac7e9bc7"],["/home/res/apps/colorPicker/colorPicker.html","34a130f2e0fc54b003a0c372986ccbac"],["/home/res/apps/element-ui/fonts/element-icons.ttf","6f0a76321d30f3c8120915e57f7bd77e"],["/home/res/apps/element-ui/fonts/element-icons.woff","2fad952a20fbbcfd1bf2ebb210dccf7a"],["/home/res/apps/element-ui/index.css","c048efcb00f2d5bf9c514d4ef1a60e1a"],["/home/res/apps/element-ui/index.js","f6398839e5674f9ef46a728938a49082"],["/home/res/apps/server/import.html","b502b6d181b1562a9c5b56c53092bb5c"],["/home/res/apps/server/index.html","dbba8c58a346d168ea85f6bf760ba358"],["/home/res/apps/yl-system/error.png","2657e18ba1e0ba90f1663a77ec5c5b58"],["/home/res/apps/yl-system/index.html","0fa2fbafa0987d8b2c543bd57869d537"],["/home/res/apps/yl-system/index.js","730bf4346f2f74f6d37d1686114b289b"],["/home/res/apps/yl-system/style.css","6956981ba08268b80810a0cd73f3cdf5"],["/home/res/components/animate.css","07f146141537e04ee282a965d8053198"],["/home/res/components/calendar/script.js","7deb1ea55685d1d65a41e24c42a82a1d"],["/home/res/components/calendar/style.css","889d07ffaea6e80b59778f86c2841b50"],["/home/res/components/clipboard-polyfill.js","43c47e6f9a265440b6d6d5c042c1abc2"],["/home/res/components/color-picker/color-picker.css","a13ab1ee68fc00fe975eade37d99459e"],["/home/res/components/color-picker/color-picker.js","090bdc46e53dba4bd8cbe45733a633f1"],["/home/res/components/contextMenu/contextMenu.css","e841b253f32a6c11d33b8e545129d340"],["/home/res/components/contextMenu/contextMenu.js","a75565d8653bdff222d067256528e954"],["/home/res/components/font-awesome-4.7.0/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/home/res/components/font-awesome-4.7.0/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/home/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/home/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/home/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/home/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/home/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/home/res/components/jquery-2.2.4.min.js","6118b1958dfcd17cc17c2c946ba32fc8"],["/home/res/components/jquery.nicescroll.min.js","d247c9568e051b91d27ba6901447e8b0"],["/home/res/components/layer-v3.0.3/layer/layer.full.js","dfda83ec7ae651a4d8c8e9cb9c123047"],["/home/res/components/layer-v3.0.3/layer/layer.js","d23ad298a090756ed9204bbca2a7c1e3"],["/home/res/components/layer-v3.0.3/layer/mobile/layer.js","2028e407c22ee7a12b05a35ee9c71882"],["/home/res/components/layer-v3.0.3/layer/mobile/need/layer.css","633915e62d14a714594b95b974ee0836"],["/home/res/components/layer-v3.0.3/layer/skin/default/icon-ext.png","ba81b24c06e2e0eac1e219405b33766b"],["/home/res/components/layer-v3.0.3/layer/skin/default/icon.png","551539f873d9ebe0792b120a9867d399"],["/home/res/components/layer-v3.0.3/layer/skin/default/layer.css","c8cf4dfed2903e1a678e6cf52256e181"],["/home/res/components/layer-v3.0.3/layer/skin/default/loading-0.gif","a72011ccdc2bcd23ba440f104c416193"],["/home/res/components/layer-v3.0.3/layer/skin/default/loading-1.gif","1140bc5c7863f8e54a3c2b179e640758"],["/home/res/components/layer-v3.0.3/layer/skin/default/loading-2.gif","50c5e3e79b276c92df6cc52caeb464f0"],["/home/res/components/vue-grid-layout-2.1.11.min.js","1871f71290243d0d7171c0d1a0658502"],["/home/res/components/vue.min.js","24063abba2ad45c26b7329e89be49d8d"],["/home/res/css/grid.css","4e60778d5d194f1d61e60c773ef71f1e"],["/home/res/css/loading.css","efb0adcae18636c7ee6d07dde4b617d9"],["/home/res/css/main.css","2e04da687ca22a6200dacd24479de425"],["/home/res/css/tiles.css","0979d1d8dda0229e159dbc182e1a2d0a"],["/home/res/css/yl-layer-skin.css","66da08271805c80346365f415730abc6"],["/home/res/img/icon/close.svg","c5449b9ab12de31be87bd78457ead906"],["/home/res/img/icon/error.png","2657e18ba1e0ba90f1663a77ec5c5b58"],["/home/res/img/icon/maximize.svg","5ec8b0ca1f75ef84473c9427bda6a899"],["/home/res/img/icon/message.svg","8990eb1399ec6e43c4ee9438214d4695"],["/home/res/img/icon/minimize.svg","62149b882a325456940eff4eb1022936"],["/home/res/img/icon/restore.svg","03e35aef920cfdfac1f296f25c4be6b6"],["/home/res/img/wallpapers/bg1.jpg","cea0a23f072704cb0f0b41b4e4f66bb1"],["/home/res/img/wallpapers/bg10.jpg","6acbcd4cf862d24aaf49c61405a02a38"],["/home/res/img/wallpapers/bg10_1.jpg","1e53b55fb02187fd885757a755c68984"],["/home/res/img/wallpapers/bg11.jpg","bec82a612e3b52ba1a2820bd0e4d5b8c"],["/home/res/img/wallpapers/bg11_1.jpg","b6c175c0e2c97a761a6095e343529f16"],["/home/res/img/wallpapers/bg12.jpg","d2ca5202eb10f3689b842ae13b6caba5"],["/home/res/img/wallpapers/bg12_1.jpg","14c7f250b712e06d23bbe023fb889fd9"],["/home/res/img/wallpapers/bg13.jpg","1ec917e5682446735ca4d09ac84f928a"],["/home/res/img/wallpapers/bg13_1.jpg","1a46279896c688078c6220eaed07e585"],["/home/res/img/wallpapers/bg14.jpg","ba9874899616b7518abbd7341ac706a1"],["/home/res/img/wallpapers/bg14_1.jpg","fd89342c254552176af42894dfeca98e"],["/home/res/img/wallpapers/bg15.jpg","cea663b1846e1d9b9f8bf45271cc0372"],["/home/res/img/wallpapers/bg15_1.jpg","fef28b8dce7dfff5e5b66e70050123fe"],["/home/res/img/wallpapers/bg1_1.jpg","77267082c29f03e7ced5334c4c2cd6fb"],["/home/res/img/wallpapers/bg2.jpg","1e1b1435df09314556fa64a58207786f"],["/home/res/img/wallpapers/bg2_1.jpg","87a8f4d3d921465ea49efd17511e065f"],["/home/res/img/wallpapers/bg3.jpg","6f385fafa91a9d04edc147b5739701ec"],["/home/res/img/wallpapers/bg3_1.jpg","2cfaef13a35041ce80029d9642ff6e62"],["/home/res/img/wallpapers/bg4.jpg","c8ddd59ea29991a12cf2bbb32cd1f13c"],["/home/res/img/wallpapers/bg4_1.jpg","8b59566dd6042c2d8248be8b38be5238"],["/home/res/img/wallpapers/bg5.jpg","0c3e0c25734eb7ac9aecba0a54c9c370"],["/home/res/img/wallpapers/bg5_1.jpg","ce6241ebb979fa8f3a408dff6d4ab7f3"],["/home/res/img/wallpapers/bg6.jpg","9a1776b26aa188e6917a45cb723b54ec"],["/home/res/img/wallpapers/bg6_1.jpg","9f60177af7e692f9471c7ab8dd210044"],["/home/res/img/wallpapers/bg7.jpg","ab9983a8b4d908a7222e63fa0424c2f2"],["/home/res/img/wallpapers/bg7_1.jpg","8e00b2f155b0334709a9daad9e7ccf23"],["/home/res/img/wallpapers/bg8.jpg","49060b22ed69da83d0d1c512a26cdcf9"],["/home/res/img/wallpapers/bg8_1.jpg","f4e17b8106527915f20d47c02993bb8a"],["/home/res/img/wallpapers/bg9.jpg","a9d0daee47a24863e62cac0e6e7bc4f5"],["/home/res/img/wallpapers/bg9_1.jpg","866b853772e237fde4d6bd1121ad3c70"],["/home/res/img/wallpapers/uploadbg.png","40fd031ef5bda8f0fd6d93327e32e8a9"],["/home/res/js/Yuri2.js","e08f6b8b5627f108680ad999b26d6a33"],["/home/res/js/yl-io.js","653eaef6d349ad3942ce808ace63a4c5"],["/home/res/js/yl-render.js","c2979b42ce2d7f70624291578bd83843"],["/home/res/js/yl-vue-component-icon.js","7d8c46b637d48ef9076f1121f10de098"],["/home/res/js/yl-vue-components.js","5e03ddb4fadbf61a35daf8a72f14aa48"],["/home/res/yl.app.js","5768abf160c7f9b9036074ccde586626"],["/home/res/yl.js","7b44055521ac558ab568b169d47b563e"],["/img/404.png","409702358b67f40eae2bf0984b280956"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/favicon.png","f3c274ceb93221ba6ad8f8e8bf8b98dc"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/img/logo.png","f3c274ceb93221ba6ad8f8e8bf8b98dc"],["/index.html","fba21b86a18046f06edd7fd1913a88eb"],["/js/card_clock.js","e120bd470fb3323430f567876e308247"],["/js/custom.js","0dcf46efe9693c8d2c8e28cc8c081c6e"],["/js/main.js","c7490acc84166752da208ec0629665e8"],["/js/search/algolia.js","533d980c0d50a0d0d7fe34c41a3e2100"],["/js/search/local-search.js","acb62dcdf7e90930da3f6bf07349fc21"],["/js/swiper_init.js","cfab3b9f4d8e73f59baaa91989189266"],["/js/tw_cn.js","b3810513e04b13b2d18c6b779c883f85"],["/js/utils.js","4cfc631de0e5f6ff12b2833cac848f27"],["/js/wow_init.js","31a17ded5ce2caa761522664b9b23051"],["/log/index.html","5680019abb4ea95f444fd809bed485f1"],["/page/2/index.html","2a0ea5e56d05cf3d40fe81fd4293ccd1"],["/page/3/index.html","8945a23e98494c035c1e6ee2280d202f"],["/page/4/index.html","7f2a0f71ce34fb3d81ff61c58f7a95fd"],["/posts/1213.html","eb204471f0446374af8c0763548e9918"],["/posts/1644.html","ea436501ad237ce854bd52043fb756e7"],["/posts/215d.html","30ba433a4471822a9959ea740200193e"],["/posts/2362.html","18e732a8bdf0994cc27ce962614becca"],["/posts/2996.html","d73500dec154d0c97d2d37a439056909"],["/posts/2d15.html","d3a6980e9530a359a1cbc540a6699ffe"],["/posts/43eb.html","d00d5aac4e984f546ce0e73ac725c792"],["/posts/5c5.html","a12ba060c9a3f20177b751582e9c4243"],["/posts/646f.html","be57b14dd134cc4a50a710fe68ca3ad3"],["/posts/68c5.html","bcec9779f467ef99ac841fe415280da1"],["/posts/6ba6.html","5f1c0ed5ab17c4f5b66414219e791f1f"],["/posts/6f25.html","50b6a66311e067ebec1a7504ecc3d16c"],["/posts/72c4.html","d43e1603a993e6e11a0527bbbbcea7f6"],["/posts/75de.html","6a980e9655137112fbf38beaf42b6bb6"],["/posts/7bc0.html","44e1ec329c91bd3e10867cca6e9d1838"],["/posts/7bd6.html","0789e7a00fb748f8b6f33b96788b5bce"],["/posts/7dd.html","ae9eed3751adf170beef234d141a2586"],["/posts/8aee.html","a05fff2d9d88b8b0f52f5c37a522fa39"],["/posts/8bbd.html","8accb173e00a1bc3bb4ca8a57a911577"],["/posts/915a.html","8c423588f60eac744bfae01987abc1ed"],["/posts/95d6.html","862ce78bb77c0ff65aa2fadeecb33116"],["/posts/9ab1.html","8740b810f56a74dcb53a9e72057399db"],["/posts/9b83.html","0461a28d4341fc8bcf01aef1e9f1ea96"],["/posts/9e+87.html","b1f678dc249bd6a4580386479dae4f98"],["/posts/a424.html","9720ac0fa6d73b24737df4f3a2aaaf1c"],["/posts/a72e.html","3a1ce82fcb3622285d27c41df7f2617c"],["/posts/afb6.html","b3c99b695ebc35e21185c97f8ba2dab9"],["/posts/bb83.html","ba3e54f45326afc9feb181644cb249df"],["/posts/c287.html","118b6dac3f032cf0cb789785bcf0badd"],["/posts/c7e3.html","00d43678d543e1f003e2f1ac4ab9c8a3"],["/posts/d4b2.html","0116aab8bf31e0e3be104c9b64e95096"],["/posts/e055.html","92949ba12d472722dd1416c765fd0233"],["/posts/edd0.html","ff9d150a72aa64f24168566f46783b26"],["/posts/eef2.html","a36eb38ccc22866c443a8beb89706bdf"],["/privacy-policy/index.html","cd7b0652bcb1aeee3a4a56e74d55fd09"],["/project/index.html","debe14229c1c6bce3e433dad79fa4441"],["/pwa/1024.png","7e3911bdbf79409440dcb1ae30f00006"],["/pwa/144.png","64865cdc03d053de6ab47e6cf9861d3b"],["/pwa/16.png","7ebf3c3baa5b8709219ad3c30429d4e8"],["/pwa/192.png","a2e3c3b054228e266911d37fe1a6851e"],["/pwa/32.png","c72f1519805a96dc59f06b51171b94e8"],["/pwa/36.png","399bcd454b2b679890fc2ec82927ea3f"],["/pwa/48.png","77a789ee7c53338e0803badc9610c4ae"],["/pwa/512.png","62c95cdb3ac1deff90eadcffeedd39a1"],["/pwa/72.png","778e7f115fde10ed04bcac4633d2413b"],["/pwa/96.png","a6b63b2fe2c38f6f68a8211205c93b31"],["/pwa/apple-touch-icon.png","dd45cf3ed77660fa5a43647ce99c0a28"],["/pwa/safari-pinned-tab.svg","ce0df4672a377dfd2e5159ca69a7fe26"],["/tags/404-畫面/index.html","808044061e63530a4f0fc35294abd653"],["/tags/Firefox/index.html","ebea88447f07274a2dd6738fe3ac32a9"],["/tags/Hexo/index.html","fba2ab5c080482b26bb9169617401e04"],["/tags/Markdown/index.html","c38877ef8e2196ca2556a57932c10e17"],["/tags/Matery/index.html","04bc0a1083a1b771b9908be7d291f139"],["/tags/PHP/index.html","0e65b46a04b9419a73f750b7a9934327"],["/tags/Tinypng/index.html","68f5f15a8030361204712390c14cebd4"],["/tags/VSCode/index.html","cb17ce6596d45348a9252ca3456a433a"],["/tags/Valine/index.html","97d056149bc016bb5fb985a00a93ecaa"],["/tags/Website/index.html","25114056bb9d186efd76021633311614"],["/tags/css/index.html","13f13e9f1e336b1fa7737a753c38e2c6"],["/tags/index.html","8446f048fbf5b9aca8100025e21f8830"],["/tags/內嵌/index.html","22d199c70634381f50aa62e7feec6dd6"],["/tags/分享/index.html","f1580f8141787467f53190e64d8f5ee8"],["/tags/可愛/index.html","addbe2b4beee6d663b1828d583caf134"],["/tags/右鍵菜單/index.html","89c19b1a7dce8a215df68acc8fb7ec4f"],["/tags/工具/index.html","7334008f9869268ea0bc9871c8677e0d"],["/tags/技巧/index.html","167120791956323776ce2e5a7aa58587"],["/tags/推送器/index.html","75d0fe9421da9900f53c522e1e154e9d"],["/tags/教學/index.html","07deabd0f7f716594a3180c489af63d7"],["/tags/漸變色/index.html","d973eaf8a19c08f017e15c0eacf8f036"],["/tags/秘訣/index.html","c2930fee6361d231e6e7366f42f7f73f"],["/tags/進度條/index.html","43826aab554508cb666f296ef964b0ef"],["/tags/黑暗模式/index.html","e13f176fbd0169be729d62a77dac3c68"],["/tools-calc/index.html","4b33b186706d1a35594749dd2537785b"],["/tools-clock/index.html","d7980a7871bd4d829a75daa068ef9b10"],["/tools-password-checker/index.html","f3acd8dec9c091dac09a225554a6549d"],["/tools-password/index.html","530cd85cb50ff1d3426506a40b3d349c"],["/tools-tran-to-simp/index.html","53f3e78e359f9bac1df16b96dc8a0d3e"],["/weather/fonts/UnidreamLED.ttf","12fc160800285847a53d4592b2357737"],["/weather/weather/01d.png","401e66803935b7035675d2b71e49ab91"],["/weather/weather/01n.png","44c6f1ba041fe91a6ae4163b38139cd1"],["/weather/weather/02d.png","b1fac6b809a3b0904d10489e490d8959"],["/weather/weather/02n.png","af1c78e11ba987fb7bd105e535e5b071"],["/weather/weather/03d.png","988ec2e80f00b7416979a3991b255e9b"],["/weather/weather/03n.png","988ec2e80f00b7416979a3991b255e9b"],["/weather/weather/04d.png","6d64f09619af982e81997c72b42f4b16"],["/weather/weather/04n.png","6d64f09619af982e81997c72b42f4b16"],["/weather/weather/09d.png","353840d24a6212e62afd2925a1fe8e47"],["/weather/weather/09n.png","353840d24a6212e62afd2925a1fe8e47"],["/weather/weather/10d.png","a80420158756c8841c58ef0af68d1ceb"],["/weather/weather/10n.png","a2c315e3c04072f33aa8b60f466b79d9"],["/weather/weather/11d.png","479324978fd9afe7c281efba79210e13"],["/weather/weather/11n.png","479324978fd9afe7c281efba79210e13"],["/weather/weather/13d.png","ca0f0747e18b9f5a8f646c780aa53620"],["/weather/weather/13n.png","ca0f0747e18b9f5a8f646c780aa53620"],["/weather/weather/50d.png","18ea6a4ca6604ae4c29ce6053c4c4819"],["/weather/weather/50n.png","18ea6a4ca6604ae4c29ce6053c4c4819"],["/weather/weather/hu.png","3754a3ea92275cc8158606e544b132a7"],["/weather/weather/loading.gif","b8c45314a21e9b46abcd38a3a69bd07d"],["/webpushr-sw.js","f6f7ff6d6b7b7b652cb92a25eb2cef5b"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/gh/*", toolbox.cacheFirst, {"origin":"cdn.jsdelivr.net"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdnjs.cloudflare.com"});




