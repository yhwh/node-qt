// Copyright (c) 2012, Artur Adib
// All rights reserved.
//
// Author(s): Artur Adib <aadib@mozilla.com>
//
// You may use this file under the terms of the New BSD license as follows:
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of Artur Adib nor the
//       names of contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
// ARE DISCLAIMED. IN NO EVENT SHALL ARTUR ADIB BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF 
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

#define BUILDING_NODE_EXTENSION
#include <node.h>

#include "qapplication.h"
#include "qwidget.h"
#include "qsize.h"
#include "qmouseevent.h"
#include "qkeyevent.h"
#include "qtesteventlist.h"
#include "qpixmap.h"
#include "qpainter.h"
#include "qcolor.h"
#include "qbrush.h"
#include "qpen.h"
#include "qimage.h"
#include "qpointf.h"
#include "qpainterpath.h"
#include "qfont.h"
#include "qmatrix.h"
#include "qsound.h"
#include "qscrollarea.h"
#include "qscrollbar.h"

using namespace v8;

void Initialize(Handle<Object> target) {
  QApplicationWrap::Initialize(target);
  QWidgetWrap::Initialize(target);
  QSizeWrap::Initialize(target);
  QMouseEventWrap::Initialize(target);
  QKeyEventWrap::Initialize(target);
  QTestEventListWrap::Initialize(target);
  QPixmapWrap::Initialize(target);
  QPainterWrap::Initialize(target);
  QColorWrap::Initialize(target);
  QBrushWrap::Initialize(target);
  QPenWrap::Initialize(target);
  QImageWrap::Initialize(target);
  QPointFWrap::Initialize(target);
  QPainterPathWrap::Initialize(target);
  QFontWrap::Initialize(target);
  QMatrixWrap::Initialize(target);
  QSoundWrap::Initialize(target);
  QScrollAreaWrap::Initialize(target);
  QScrollBarWrap::Initialize(target);
}

NODE_MODULE(qt, Initialize)
