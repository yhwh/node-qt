{
  'targets': [
    {
      'target_name': 'qt',
      'sources': [
        'src/qt.cc', 'src/qapplication.cc', 'src/qwidget.cc', 'src/qsize.cc', 
        'src/qmouseevent.cc', 'src/qkeyevent.cc',
        'src/qtesteventlist.cc', 'src/qpixmap.cc',
        'src/qpainter.cc', 'src/qcolor.cc', 'src/qbrush.cc', 'src/qpen.cc',
        'src/qimage.cc', 'src/qpointf.cc', 'src/qpainterpath.cc', 'src/qfont.cc',
        'src/qmatrix.cc', 'src/qsound.cc', 'src/qscrollarea.cc', 'src/qscrollbar.cc'
      ],
      'conditions': [
        ['OS=="mac"', {
          'include_dirs': [
            'deps/qt-4.8.0/darwin/x64/include',
            'deps/qt-4.8.0/darwin/x64/include/QtCore',
            'deps/qt-4.8.0/darwin/x64/include/QtGui',
            'deps/qt-4.8.0/darwin/x64/include/QtTest'
          ],
          'libraries': [
            'deps/qt-4.8.0/darwin/x64/lib/QtCore.framework/QtCore', 
            'deps/qt-4.8.0/darwin/x64/lib/QtGui.framework/QtGui', 
            'deps/qt-4.8.0/darwin/x64/lib/QtTest.framework/QtTest'
          ],
        }]
      ],
    }
  ]
}
