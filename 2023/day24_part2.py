import fileinput, re, z3

h = [ list( map( int, re.findall( "-?\d+", l ) ) )
      for l in open('./day24_input.txt').read().splitlines() ]

pxi, pyi, pzi, vxi, vyi, vzi = z3.Reals( "pxi pyi pzi vxi vyi vzi" )
ts = [ z3.Real( "t" + str( i ) ) for i in range( len( h ) ) ]

s = z3.Solver()
for i, ( px, py, pz, vx, vy, vz ) in enumerate( h[:3] ):
    s.add( px + vx * ts[ i ] == pxi + vxi * ts[ i ] )
    s.add( py + vy * ts[ i ] == pyi + vyi * ts[ i ] )
    s.add( pz + vz * ts[ i ] == pzi + vzi * ts[ i ] )
s.check()
print( s.model().evaluate( pxi + pyi + pzi ) )
