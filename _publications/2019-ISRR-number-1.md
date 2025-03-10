---
title: "Active rendezvous for multi-robot pose graph optimization using sensing over Wi-Fi"
collection: publications
category: conferences
permalink: /publication/2019-ISRR-number-1
excerpt: 'Framework for improving collaboration amongst a team of robots performing distributed Pose Graph Optimization (PGO)'
date: 2019-10-10
venue: 'International Symposium of Robotics Research (ISRR)'
paperurl: 'https://jadhavhninad.github.io/files/2019-ISRR-number-1.pdf'
citation: 'Weiying Wang, <strong>Ninad Jadhav</strong>, Paul A. Vohs, Nathan Hughes, Mark Mazumder and Stephanie Gil.'
---

We present a novel framework for collaboration amongst a team of robots performing Pose Graph Optimization (PGO) that addresses two important challenges for multi-robot SLAM: i) that of enabling information exchange “on-demand” via Active Rendezvous without using a map or the robot’s location, and ii) that of rejecting outlying measurements. Our key insight is to exploit relative position data present in the communication channel between robots to improve groundtruth accuracy of PGO. We develop an algorithmic and experimental framework for integrating Channel State Information (CSI) with multi-robot PGO; it is distributed, and applicable in low-lighting or featureless environments where traditional sensors often fail. We present extensive experimental results on actual robots and observe that using Active Rendezvous results in a 64% reduction in ground truth pose error and that using CSI observations to aid outlier rejection reduces ground truth pose error by 32%. These results show the potential of integrating communication as a novel sensor for SLAM.

