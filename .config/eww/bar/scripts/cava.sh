#! /bin/bash

printf "
[general]\n
framerate=25\n
bars = 4\n
[output]\n
method = raw\n
raw_target = /dev/stdout\ndata_format = ascii\nascii_max_range = 7\n" | \
  cava -p /dev/stdin | \
  sed -u 's/;//g;s/0/▁/g;s/1/▂/g;s/2/▃/g;s/3/▄/g;s/4/▅/g;s/5/▆/g;s/6/▇/g;s/7/█/g; '
