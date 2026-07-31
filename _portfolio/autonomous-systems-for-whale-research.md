---
title: "Autonomous Systems for Whale Research"
excerpt: "Field robotic systems for remote tracking, rendezvous, and biological observation of sperm whales."
collection: portfolio
permalink: /portfolio/autonomous-systems-for-whale-research/
research_area: whale
order: 2
---

I design and deploy autonomous robotic systems for tracking and observing sperm whales at sea. This work combines acoustic, visual, and VHF sensing with autonomous planning on aerial and marine platforms to improve remote tracking, rendezvous, and biological data collection.

The research includes waterproof drone payloads, onboard VHF directionality estimation with software-defined radios, multi-robot planning, and autonomous quadcopter deployments. These systems have been tested during field expeditions in Dominica in collaboration with marine biologists, roboticists, and Project CETI's marine operations team.

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
