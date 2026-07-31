---
title: "Multi-Robot Systems and Wireless Sensing"
excerpt: "Multi-robot coordination, decentralized exploration, and wireless signals as an onboard sensing modality."
collection: portfolio
permalink: /portfolio/multi-robot-systems-and-wireless-sensing/
research_area: multi_robot_wifi
order: 1
---

I develop algorithms and systems for robot teams operating under limited communication and in challenging, unknown environments. My work uses WiFi channel state information, ultra-wideband, LiDAR, and robot motion to turn communication signals into an additional sensing modality.

This research includes real-time wireless signal directionality estimation, decentralized multi-robot exploration through implicit information exchange, active robot rendezvous, and WiFi-based relative localization. The systems have been implemented on ground and aerial platforms using ROS, C++, and onboard computing hardware.

Related Publications
--------------------

{% assign related_count = 0 %}
{% for post in site.publications reversed %}
  {% if post.research_areas contains page.research_area %}
    {% assign related_count = related_count | plus: 1 %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}

{% if related_count == 0 %}
No publications have been associated with this research area yet.
{% endif %}
