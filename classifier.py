# for
# list of blobs
# x,y coordinates for each blob
# weight --> blob (# of pixels)
# coordinates of brightest pixel
# is this blob the cue ball

# image-124124.jpeg:
# blob[0]:
# [14000, 23230, 3435.2, 3423,2 234, 0]

import numpy as numpy
from sklearn.naive_bayes import GaussianNB

data_path = './Features/10779 - 10888.csv'
data = numpy.genfromtxt(data_path)
target = numpy.genfromtxt('pathname', delimiter=',')


clf = GaussianNB()
clf.fit(data, target)



