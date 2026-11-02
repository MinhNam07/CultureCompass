import struct
def read_dbf(path):
    f=open(path,'rb').read()
    n,hl,rl=struct.unpack('<xxxxIHH',f[:12])
    fields=[];o=32
    while f[o]!=0x0D:
        name=f[o:o+11].split(b'\0')[0].decode(); ln=f[o+16]; fields.append((name,ln)); o+=32
    recs=[]
    for i in range(n):
        r=f[hl+i*rl+1:hl+(i+1)*rl]; d={};p=0
        for name,ln in fields: d[name]=r[p:p+ln].decode('utf8','replace').strip(); p+=ln
        recs.append(d)
    return recs
def read_shp(path):
    f=open(path,'rb').read(); o=100; shapes=[]
    while o<len(f):
        num,ln=struct.unpack('>II',f[o:o+8]); c=f[o+8:o+8+ln*2]; o+=8+ln*2
        t=struct.unpack('<i',c[:4])[0]
        if t==0: shapes.append([]); continue
        np_,npt=struct.unpack('<ii',c[36:44]); parts=list(struct.unpack('<%di'%np_,c[44:44+4*np_]))
        pts=struct.unpack('<%dd'%(2*npt),c[44+4*np_:44+4*np_+16*npt]); pts=list(zip(pts[0::2],pts[1::2]))
        parts.append(npt); shapes.append([pts[parts[i]:parts[i+1]] for i in range(np_)])
    return shapes
