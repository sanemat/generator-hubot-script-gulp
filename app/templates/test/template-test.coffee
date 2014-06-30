assert = require 'assert'
sinon = require 'sinon'

describe '<%= scriptName %>', ->
  beforeEach ->
    @robot =
      respond: sinon.spy()
      hear: sinon.spy()

    require('../src/<%= scriptName %>')(@robot)

  it 'registers a respond listener', ->
    assert(@robot.respond.calledWith(/hello/))

  it 'registers a hear listener', ->
    assert(@robot.hear.calledWith(/orly/))
