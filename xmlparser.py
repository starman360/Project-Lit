import csv 
import requests 
import xml.etree.ElementTree as ET 
from collections import OrderedDict
  
def loadRSS(): 
  
    # url of rss feed 
    url = 'http://www.hindustantimes.com/rss/topnews/rssfeed.xml'
  
    # creating HTTP response object from given url 
    resp = requests.get(url) 
  
    # saving the xml file 
    with open('topnewsfeed.xml', 'wb') as f: 
        f.write(resp.content) 
          
  
def parseXML(xmlfile): 
    words = OrderedDict()
    # create element tree object 
    tree = ET.parse(xmlfile) 
  
    # get root element 
    root = tree.getroot() 
    for p in root.find('body'):
        # print(p.attrib['t'])
        t = int(p.attrib['t'],10)
        # print(p.tag, p.attrib)
        for s in p:
            t2 = t
            if 't' in s.keys():
                t2 = t + int(s.attrib['t'])
            words[t2] = s.text.strip()
            # print(s.tag, s.attrib)
        # print('------')

    return words
   

def countwords(words): 
    uniquewords = OrderedDict()
    for key in words.keys():
        uword = words[key]
        if uword not in uniquewords:
            uniquewords[uword] = 1;
        else:
            uniquewords[uword] = uniquewords[uword] + 1
    return uniquewords
  
def savetoCSV(words, filename): 
    # writing to csv file 
    with open(filename, 'w') as f: 
        for key in words.keys():
                f.write("%s,%s\n"%(key,words[key]))
    


def main(): 
    # load rss from web to update existing xml file 
    # loadRSS() 
  
    # parse xml file 
    words = parseXML('timetext.xml') 
    uwords = countwords(words)
    # store news items in a csv file 
    savetoCSV(words, 'timetext.csv') 
    savetoCSV(uwords, 'uniquewords.csv') 
      
      
if __name__ == "__main__": 
  
    # calling main function 
    main() 