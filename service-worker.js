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

var precacheConfig = [["/404.html","ec10259273bd0ae0eec3672d0203215e"],["/CSS-1/index.html","8dd39df41cc3a1acb68857eb6d9c6c76"],["/CSS-2/index.html","7ff18efb8b8fab325aeb719b924baf48"],["/CSS-3/index.html","422ebc3464d6e058aa3482f1f1945eff"],["/CSS-4/index.html","9a52cbeb42f0d477c8e0eac50fea4e18"],["/CSS-5/index.html","d1dac310148b0d4b27d0b9485a8a1af8"],["/CSS-6/index.html","d6c14025c9bcd880a98db86a02d62a95"],["/CSS-7/index.html","c9886ba7a793ea8fdcf8347968cadfbc"],["/CSS-8/index.html","4f860637a90d7b64d1a9d860a7ca9ce1"],["/about-site/index.html","8f66c8a5b6c0aff86ad0000f6803e0f5"],["/about/index.html","a31ac7362cba39618e7a4048814e1215"],["/archives/2020/12/index.html","f305af129bc573af7faf2819e23e0f22"],["/archives/2020/12/page/2/index.html","1897896a9dcfba51573475f33d878f15"],["/archives/2020/index.html","61129282bdc3ad38975a47b409e81628"],["/archives/2020/page/2/index.html","b1df66d050cf347e6df5457e8e9a746e"],["/archives/2021/01/index.html","8878aad0ae2ecaf11121137e0121e1a7"],["/archives/2021/01/page/2/index.html","d695929ed354a86bdba8cd38b1dee04d"],["/archives/2021/02/index.html","6f9654ba3a516a39dfe1f8e927c32396"],["/archives/2021/03/index.html","743becbf17c894e7101eed3c67318968"],["/archives/2021/index.html","fe109b5781b2a52edba8891030b64ded"],["/archives/2021/page/2/index.html","fe24b89f9da4a88cdc5a6f6b4b5453c9"],["/archives/2021/page/3/index.html","6063e9de6dcae605b60fea7252bb7dec"],["/archives/index.html","5b442d10aeaa74096eaa011b40a55a39"],["/archives/page/2/index.html","8f772e3bc4b3464d3eaf486912d61524"],["/archives/page/3/index.html","dd34aa94ccccdc12564e76d47230eca8"],["/archives/page/4/index.html","ee365e2a4a398d31b212c44449c4e86f"],["/categories/index.html","8c83ba245e82eb7f534711659ffb845c"],["/categories/其他/index.html","c4dce9d791055d887be417a8cf7188b2"],["/categories/分享/index.html","9fa2abf9c101824e131b3736b6935322"],["/categories/分享/建議/index.html","dd9d9ee72ab52d4c36e9499aa524a133"],["/categories/教學/000webhost/index.html","876794637de6f6d25a11d742611d774b"],["/categories/教學/Dark-mode/index.html","b69ccea5d228c36e9025b9a1476cdc54"],["/categories/教學/Windows/index.html","ceb42355405f494cb88e4e975fb944dd"],["/categories/教學/index.html","b3576d411de3d7bac3ae9d629f344c1e"],["/categories/教學/page/2/index.html","b6da3a6d2c988ac8b92d76d130e0b169"],["/categories/教學/軟件/index.html","0f8e7eb04a4a2ed74898fda099cc6579"],["/categories/自學/PHP/index.html","281d4463f5794280352383c46cb0f181"],["/categories/自學/index.html","aae31e03bf1e54c133a62c4a9ddad36e"],["/categories/解難/index.html","e913797ad06b755cc5e7d80f18291b52"],["/contact/index.html","2df989b9e28cd49aed58371cb04947f0"],["/css/custom.css","41435d49bc28db03ba6d203df7e787c0"],["/css/index.css","5ccc45533bf1606af5391f8ce1973060"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/disqus/index.html","132628cb6d96985e72bf3c8657747e29"],["/files/demo-google-404/index.html","87c607f61c3773dd785e2f564f286137"],["/files/demo/index.html","3841b0f96dcbe117c619dc07d7d8e492"],["/font/LXGWWenKai-Medium.ttf","eb314338fb26965e95e89dd229ee9700"],["/font/UnidreamLED.ttf","12fc160800285847a53d4592b2357737"],["/friendcircle/index.html","2b06a2c9de0d1a0123c46febfee5d27b"],["/friends/index.html","646cdce791250ff5c65ed827899100a5"],["/getip/index.html","08dc23dc6a528563cc2fbb5bb8fd4286"],["/home/configs.js","0c3357de301b19c0d9beb0e2ce7dbd24"],["/home/index.html","a6e409b5ff72a10a8d7d91045a7c8565"],["/home/onLoad.js","6256e3f24ab0994f2db4daccac3c4ef8"],["/home/res/apps/browser/index.css","a8c2acc8b4e80925c696c6fcb8ad6727"],["/home/res/apps/browser/index.html","f775de3421cbc1a265f27bb82171e718"],["/home/res/apps/colorPicker/colorPicker.html","58e43d4e4c8417f94db8a26c4931686a"],["/home/res/apps/element-ui/fonts/element-icons.ttf","6f0a76321d30f3c8120915e57f7bd77e"],["/home/res/apps/element-ui/fonts/element-icons.woff","2fad952a20fbbcfd1bf2ebb210dccf7a"],["/home/res/apps/element-ui/index.css","f00b876c62afec2a776a0b458d9e4643"],["/home/res/apps/element-ui/index.js","49a492777dd9302b40482af071610868"],["/home/res/apps/server/import.html","ef51ba18c8fffc4d947dd00f17f59378"],["/home/res/apps/server/index.html","70aa8acc155e3b652c3938be7719245f"],["/home/res/apps/yl-system/error.png","2657e18ba1e0ba90f1663a77ec5c5b58"],["/home/res/apps/yl-system/index.html","488f7ae425bc239db550a6398a5487a3"],["/home/res/apps/yl-system/index.js","f25afc90678a97279e067a3fad4ceaab"],["/home/res/apps/yl-system/style.css","844ce4c7d6f3a9bbd83ffa2283c1cd12"],["/home/res/components/animate.css","a8aa7b964cf99f74b6ad0e053944c0aa"],["/home/res/components/calendar/script.js","c7e1b9d6cfcf7a9cee1b49df5644d862"],["/home/res/components/calendar/style.css","e9bf0486e34a87cefb10f2dd68de1f47"],["/home/res/components/clipboard-polyfill.js","963ecea7406b6ef823559bfc5d654920"],["/home/res/components/color-picker/color-picker.css","e2920d99bdaed66966f0dcc873a058e0"],["/home/res/components/color-picker/color-picker.js","8c24821f27494f6c26d71e783012e0a2"],["/home/res/components/contextMenu/contextMenu.css","9f0e16afbd0be1484b3ec65165d0f907"],["/home/res/components/contextMenu/contextMenu.js","91f81a7db6b30bab32e7bbe2a9c185ab"],["/home/res/components/font-awesome-4.7.0/css/font-awesome.css","c97c3824a8d6c5eb936727310d68fe87"],["/home/res/components/font-awesome-4.7.0/css/font-awesome.min.css","c97c3824a8d6c5eb936727310d68fe87"],["/home/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/home/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/home/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/home/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/home/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/home/res/components/jquery-2.2.4.min.js","6118b1958dfcd17cc17c2c946ba32fc8"],["/home/res/components/jquery.nicescroll.min.js","d247c9568e051b91d27ba6901447e8b0"],["/home/res/components/layer-v3.0.3/layer/layer.full.js","53682b0d8b6790a2e9928abe775a09be"],["/home/res/components/layer-v3.0.3/layer/layer.js","bc275d1d3f5905c200b2fbda7e1d40d6"],["/home/res/components/layer-v3.0.3/layer/mobile/layer.js","99400c0d3128284960f3875561b23710"],["/home/res/components/layer-v3.0.3/layer/mobile/need/layer.css","3e0558d12707baf1e6dc41a4cd87ff01"],["/home/res/components/layer-v3.0.3/layer/skin/default/icon-ext.png","ba81b24c06e2e0eac1e219405b33766b"],["/home/res/components/layer-v3.0.3/layer/skin/default/icon.png","551539f873d9ebe0792b120a9867d399"],["/home/res/components/layer-v3.0.3/layer/skin/default/layer.css","bfed639b478bd63956bf3e12c45a4061"],["/home/res/components/layer-v3.0.3/layer/skin/default/loading-0.gif","a72011ccdc2bcd23ba440f104c416193"],["/home/res/components/layer-v3.0.3/layer/skin/default/loading-1.gif","1140bc5c7863f8e54a3c2b179e640758"],["/home/res/components/layer-v3.0.3/layer/skin/default/loading-2.gif","50c5e3e79b276c92df6cc52caeb464f0"],["/home/res/components/vue-grid-layout-2.1.11.min.js","1871f71290243d0d7171c0d1a0658502"],["/home/res/components/vue.min.js","24063abba2ad45c26b7329e89be49d8d"],["/home/res/css/grid.css","13989503e66f9232eff89062c69ba6bb"],["/home/res/css/loading.css","fcc877d6896a0a5eaf218456792facf5"],["/home/res/css/main.css","b90ec6daa0b5f0dc08eb565f84459624"],["/home/res/css/tiles.css","0f8163329a13f77ca5b1af3b9075c9ff"],["/home/res/css/yl-layer-skin.css","eb17f7cb503af665374531ab4016520a"],["/home/res/img/icon/close.svg","c5449b9ab12de31be87bd78457ead906"],["/home/res/img/icon/error.png","2657e18ba1e0ba90f1663a77ec5c5b58"],["/home/res/img/icon/maximize.svg","5ec8b0ca1f75ef84473c9427bda6a899"],["/home/res/img/icon/message.svg","8990eb1399ec6e43c4ee9438214d4695"],["/home/res/img/icon/minimize.svg","62149b882a325456940eff4eb1022936"],["/home/res/img/icon/restore.svg","03e35aef920cfdfac1f296f25c4be6b6"],["/home/res/img/wallpapers/bg1.jpg","cea0a23f072704cb0f0b41b4e4f66bb1"],["/home/res/img/wallpapers/bg10.jpg","6acbcd4cf862d24aaf49c61405a02a38"],["/home/res/img/wallpapers/bg10_1.jpg","1e53b55fb02187fd885757a755c68984"],["/home/res/img/wallpapers/bg11.jpg","bec82a612e3b52ba1a2820bd0e4d5b8c"],["/home/res/img/wallpapers/bg11_1.jpg","b6c175c0e2c97a761a6095e343529f16"],["/home/res/img/wallpapers/bg12.jpg","d2ca5202eb10f3689b842ae13b6caba5"],["/home/res/img/wallpapers/bg12_1.jpg","14c7f250b712e06d23bbe023fb889fd9"],["/home/res/img/wallpapers/bg13.jpg","1ec917e5682446735ca4d09ac84f928a"],["/home/res/img/wallpapers/bg13_1.jpg","1a46279896c688078c6220eaed07e585"],["/home/res/img/wallpapers/bg14.jpg","ba9874899616b7518abbd7341ac706a1"],["/home/res/img/wallpapers/bg14_1.jpg","fd89342c254552176af42894dfeca98e"],["/home/res/img/wallpapers/bg15.jpg","cea663b1846e1d9b9f8bf45271cc0372"],["/home/res/img/wallpapers/bg15_1.jpg","fef28b8dce7dfff5e5b66e70050123fe"],["/home/res/img/wallpapers/bg1_1.jpg","77267082c29f03e7ced5334c4c2cd6fb"],["/home/res/img/wallpapers/bg2.jpg","1e1b1435df09314556fa64a58207786f"],["/home/res/img/wallpapers/bg2_1.jpg","87a8f4d3d921465ea49efd17511e065f"],["/home/res/img/wallpapers/bg3.jpg","6f385fafa91a9d04edc147b5739701ec"],["/home/res/img/wallpapers/bg3_1.jpg","2cfaef13a35041ce80029d9642ff6e62"],["/home/res/img/wallpapers/bg4.jpg","c8ddd59ea29991a12cf2bbb32cd1f13c"],["/home/res/img/wallpapers/bg4_1.jpg","8b59566dd6042c2d8248be8b38be5238"],["/home/res/img/wallpapers/bg5.jpg","0c3e0c25734eb7ac9aecba0a54c9c370"],["/home/res/img/wallpapers/bg5_1.jpg","ce6241ebb979fa8f3a408dff6d4ab7f3"],["/home/res/img/wallpapers/bg6.jpg","9a1776b26aa188e6917a45cb723b54ec"],["/home/res/img/wallpapers/bg6_1.jpg","9f60177af7e692f9471c7ab8dd210044"],["/home/res/img/wallpapers/bg7.jpg","ab9983a8b4d908a7222e63fa0424c2f2"],["/home/res/img/wallpapers/bg7_1.jpg","8e00b2f155b0334709a9daad9e7ccf23"],["/home/res/img/wallpapers/bg8.jpg","49060b22ed69da83d0d1c512a26cdcf9"],["/home/res/img/wallpapers/bg8_1.jpg","f4e17b8106527915f20d47c02993bb8a"],["/home/res/img/wallpapers/bg9.jpg","a9d0daee47a24863e62cac0e6e7bc4f5"],["/home/res/img/wallpapers/bg9_1.jpg","866b853772e237fde4d6bd1121ad3c70"],["/home/res/img/wallpapers/uploadbg.png","40fd031ef5bda8f0fd6d93327e32e8a9"],["/home/res/js/Yuri2.js","a01c856ab327eb31716c8fa0eafdba1a"],["/home/res/js/yl-io.js","15b9b559def8a63dbcddd390ea317ef9"],["/home/res/js/yl-render.js","51d9c81ca3c376aa59f5f9e757fe218f"],["/home/res/js/yl-vue-component-icon.js","66c8a578bcbc88e5cc74de777960f23b"],["/home/res/js/yl-vue-components.js","03a5966e3db4a75c351235ed59097bf8"],["/home/res/yl.app.js","8c4cf2def1dafc85ec4917a8da6eed27"],["/home/res/yl.js","f55e93a335a27dd8bea8ce7c83109ef1"],["/img/404.png","409702358b67f40eae2bf0984b280956"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/favicon.png","f3c274ceb93221ba6ad8f8e8bf8b98dc"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/img/logo.png","f3c274ceb93221ba6ad8f8e8bf8b98dc"],["/index.html","5b7ce102bcd616f03d4d84d88ac0a3cb"],["/js/custom.js","ae56805c46639ee485a8aaa622a5c643"],["/js/main.js","55bed3394f68e7a9e24f19176ac545be"],["/js/search/algolia.js","9f72ef8b8fdda25a767a787cd4bf9121"],["/js/search/local-search.js","83ac0c1e2c52de69956abb3257890abf"],["/js/swiper_init.js","d264a13441446b2e9be961b8078e7d89"],["/js/tw_cn.js","0310e94ad716c794eadcb0fddfab0a2a"],["/js/utils.js","78ec7ed0abaa81fd42522b9d6a563a5a"],["/log/index.html","511e8606d85b2ce96776df644dd678b4"],["/page/2/index.html","c4263522964dbc47fd8819c88e1df077"],["/page/3/index.html","e75a8b5b40f57af8431e63d0f2f4b467"],["/page/4/index.html","199152ffc77c557957518574a55f9977"],["/posts/1213.html","44aacb255973e3091c4b5b38dc5ae847"],["/posts/1644.html","af866d2575dc13411391f00b245682f9"],["/posts/215d.html","d77dc680c4d441630de1101f33d6a048"],["/posts/2362.html","5fd74f603603d47abc248ee36518c272"],["/posts/2996.html","39d21eda399968dcb91feaf4a02e35fb"],["/posts/2d15.html","2e98589a55c9ef3e781dbd7e506a4c5d"],["/posts/43eb.html","a152cbe77cc8091cf9e91214fb1c1a04"],["/posts/5c5.html","48b9f2cd2bfb31b1070ee17d1fa082c1"],["/posts/646f.html","dcf895d413926cb91110701eab451aa5"],["/posts/68c5.html","863698e257648e0bd68ebaea6d7d2d13"],["/posts/6ba6.html","ddf1e13bcdb57d952b1ccaf7ad091ce3"],["/posts/6f25.html","839d454fb64c66bc51797a67a0b971a4"],["/posts/72c4.html","2e4fda01c2dcd3f021dac0c99eebdae2"],["/posts/75de.html","97a45651a849a5cb4ca7a7dff767f467"],["/posts/7bc0.html","e78dae0ba6ee3685939fe87cb54ff22e"],["/posts/7bd6.html","59825c5808759efe8802350e539f8fbb"],["/posts/7dd.html","4fc6aa902b9492e9f98367a575e140be"],["/posts/8aee.html","1fe5dbd7dcef03c193fc3c2a04426f6b"],["/posts/8bbd.html","7f0f3713ab1f7fe37f8bb5dee8e53746"],["/posts/915a.html","39e8a6caeedabba110aa0aba3f27a160"],["/posts/95d6.html","59f9a9f04ab71af7bb6b0a9b3e870dae"],["/posts/9ab1.html","ab8088a6ecdbb918976b5d3a50fc7b73"],["/posts/9b83.html","d067f91ff01ff0283d29350dce439afc"],["/posts/9e+87.html","cd940df96dc2093f9d7d2ec4ba1111ed"],["/posts/a424.html","c83d3e94650fd4cb7cf65d25d53611f6"],["/posts/a72e.html","b6ec54412540e414429bdf89a69edcf7"],["/posts/afb6.html","62329da52e9dc863e39588fd6cd1d2e7"],["/posts/bb83.html","f2ae239278009a8d9b7c303c10f91cdc"],["/posts/c287.html","636c8f2b08c0cad568ae36979b8b1d6b"],["/posts/c7e3.html","33ca2f20066cf2e69cbfeb29d6747340"],["/posts/d4b2.html","c47661cc476fd2f8d4e167620c37eae9"],["/posts/e055.html","00d9d5f0250866af187b85731657a737"],["/posts/edd0.html","25e1a75cdfb2f945b7a2056795d26968"],["/posts/eef2.html","bf948dfe6d77a927055db40afe32ec68"],["/privacy-policy/index.html","823539b7eb0cf2f9b682fd0542869003"],["/project/index.html","0efe6a31e26900785b556c3563d86886"],["/pwa/1024.png","7e3911bdbf79409440dcb1ae30f00006"],["/pwa/144.png","64865cdc03d053de6ab47e6cf9861d3b"],["/pwa/16.png","7ebf3c3baa5b8709219ad3c30429d4e8"],["/pwa/192.png","a2e3c3b054228e266911d37fe1a6851e"],["/pwa/32.png","c72f1519805a96dc59f06b51171b94e8"],["/pwa/36.png","399bcd454b2b679890fc2ec82927ea3f"],["/pwa/48.png","77a789ee7c53338e0803badc9610c4ae"],["/pwa/512.png","62c95cdb3ac1deff90eadcffeedd39a1"],["/pwa/72.png","778e7f115fde10ed04bcac4633d2413b"],["/pwa/96.png","a6b63b2fe2c38f6f68a8211205c93b31"],["/pwa/apple-touch-icon.png","dd45cf3ed77660fa5a43647ce99c0a28"],["/pwa/safari-pinned-tab.svg","ce0df4672a377dfd2e5159ca69a7fe26"],["/tags/404-畫面/index.html","6fc66137e77d591857cb75a9270f7cd9"],["/tags/Firefox/index.html","99447d88702c175e65d6576b283d1ba9"],["/tags/Hexo/index.html","7f5c38b348a8f0d080195cf69462ce4d"],["/tags/Markdown/index.html","145243b655d1b8d9f852bfcad8e22783"],["/tags/Matery/index.html","fc078573a6289e55849c19345cdf1844"],["/tags/PHP/index.html","6e3d0ca2e44baad2d22b991daae1529b"],["/tags/Tinypng/index.html","3d8f824c286afedf934b8d4281be7cb9"],["/tags/VSCode/index.html","81d28de3d3a37145252e316ec4091a68"],["/tags/Valine/index.html","d0e361b8ac2b9efc55ed0b065d8d96a6"],["/tags/Website/index.html","f837e240260716823dd4304be12a23f4"],["/tags/css/index.html","b02b337fe584a0ca57a6c3734c7505f5"],["/tags/index.html","a6b77f870e66f8b03cb756afb55278d3"],["/tags/內嵌/index.html","8d1fbbc7668eca7e42026aef18d98661"],["/tags/分享/index.html","5a2c747a61fdd72f39b213ee734a81d2"],["/tags/可愛/index.html","f26d4c51c8eab5c68d7985b08e076bf3"],["/tags/右鍵菜單/index.html","1e6fc77db279f164a94b6f342d4b8971"],["/tags/工具/index.html","d7ab1aa0828e6e445dcb9d58b4e595e9"],["/tags/技巧/index.html","c92013a8f870d2b6119a97d8fc730a02"],["/tags/推送器/index.html","7874157ad114a976d8726424ccab8741"],["/tags/教學/index.html","ab8794c0e4f85776d2a7ddfd60228168"],["/tags/漸變色/index.html","1e5851d794af640b3889642850e87cff"],["/tags/秘訣/index.html","4c2fd66be3f5ed2c6dfa4c78668d9498"],["/tags/進度條/index.html","6e3d52d4d617a4780c0f0b65ff509619"],["/tags/黑暗模式/index.html","d31a44c156e59f940d48f1d176c95875"],["/tools-calc/index.html","655d93ec5509294fa54b408dcdb361f0"],["/tools-clock/index.html","06fb7ccfd67678bb178cdc5f2611486a"],["/tools-password-checker/index.html","66c130162e122925ec2f6b05d91dac79"],["/tools-password/index.html","06722a9afdfd7436f2c219b6b91e7f5b"],["/tools-tran-to-simp/index.html","2de536cc9fa1823b0c9ed8dfd368bf63"],["/webpushr-sw.js","3dd13be78f2f0116ab78f229ab075216"]];
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




