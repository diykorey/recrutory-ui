kandidatoApp.controller('candidateCtrl', function($scope, $rootScope, $log, ApiDataFactory, $timeout, $sce, $q, debounce, api) {

  $scope.hidePredefined = false;
  $scope.hideCustom = true;
  $scope.hidePrime = true;
  $scope.customFields = []
  $scope.flowaddModel = {}
  $scope.addFieldProgress = false
  $scope.flowSuggested = []
  $scope.flowAvailable = []
  $scope.newField = {}
  $scope.newField.type = {}
  $rootScope.entityCurrent = "candidate";
  /**
   * Gets all candidates data from API
   */

  $scope.getCandidatesData = function(data) {
    if (!data) {


      $rootScope.loader = true
      ApiDataFactory.queryGet('candidate/findByOwner/1').then(function(result) {
        $rootScope.loader = false

        $scope.candidatesData = result // response data
        console.log($scope.candidatesData)

      })
    } else {
      $scope.candidatesData = data
    }
  }

  $scope.updateField = function (data) {
    api.updateCandidateField(data).then(function (res) {
      $scope.showToast();
    })
  }


  var data = false;
  $scope.getCandidatesData(data)
  $scope.$on('searchCandidateDataArrived', function(event, data) {
    $scope.getCandidatesData(data)
  });

  $scope.$on("listFilterSearch", function (event, data) {
    if(data){
    $scope.candidatesData = data
    }
    else{
      $scope.getCandidatesData()
    }
  })

  /**
   * Tags actions, add and delete.
   */


  $scope.tags = {

    add: function() {
      if (/^\s*$/.test($scope.tagEdit)) {
        $scope.tagEdit = ""
        return

      }

      _.each($scope.currentCandidate.tags, function(tag) {
        if (tag.keyword === $scope.tagEdit) {
          $scope.sameTagFound = true
        };

      });

      if ($scope.sameTagFound === true) {
        $scope.tagEdit = ""
        delete $scope.sameTagFound
        return
      };


      $scope.tagEdit = $scope.tagEdit.replace(/,/g, "")
      $rootScope.updateProcess = true
      var tag = {}
      tag.keyword = $scope.tagEdit
      $scope.currentCandidate.tags.push(tag)
      tag = {}
      tag.tags = [$scope.tagEdit]
      var URL = 'candidate/' + $scope.currentCandidate.id + '/tags'
      ApiDataFactory.queryPost(URL, tag).then(function(result) {
        $rootScope.updateProcess = false
        $scope.showToast()
        $scope.currentCandidate = result
      })
      $scope.tagEdit = ""
    },
    delete: function(tag) {
      var i = 0
      _.each($scope.currentCandidate.tags, function(tagEach) {

        if (tagEach.keyword === tag.keyword) {
          $scope.currentCandidate.tags.splice(i, 1);
          var URL = 'candidate/' + $scope.currentCandidate.id + '/tags/' + tag.id
          ApiDataFactory.queryDelete(URL).then(function(result) {})
          return
        };
        i++
      })
    }

  }
  $scope.changeType = function(fieldType){
    $scope.newField.type.name = fieldType.name;
  };



$scope.reloadSubMenu = function(index) {
  console.log(index)
  if (index == 1) {
    console.log("load flow")
  $scope.loadFlow();
  }
  if (index == 3) {
    console.log("load notes")
  getCandidateNotes()
  }
  if (index == 2) {
    console.log("load suggestions")
  $scope.loadSuggestions()
  }

}



  /**
   * Sets current candidate to scope
   */

  $scope.selectCandidate = function(candidate) {

    document.title = "Recrutory - " + candidate.name;
    if ($scope.returnSelectDefault == true) {
      $scope.returnSelectDefault = false
      return
    };
    if ($scope.currentCandidate && candidate.id == $scope.currentCandidate.id) {
      $scope.currentCandidate = false;
      delete $scope.selectedIndex
      document.title = "Recrutory"
      return
    };
    // window.scrollTo(0, 0);
    $scope.currentCandidate = candidate
    console.log($scope.currentCandidate)
    if(!$scope.selectedIndex){
    $timeout(function() {
      $scope.selectedIndex = 1;
    }, 0);
    }
    else{
        $rootScope.updateProcess = true;
$scope.reloadSubMenu($scope.selectedIndex)
    }
    $scope.getCandidatesFields();

  }



  $scope.fixedAside = function(id) {

	if($('#field-name').length){
		var n = new ComboBox('field-name');
	}

	if($('.fixed').length){

		var fixed = $('.fixed');
		var base = $('.fixed-base');
		var pointStart = base.offset().top - 20;
		var pointEnd = base.offset().top + base.outerHeight() - fixed.height() - 20;

		if($(window).scrollTop() < pointStart){
			fixed.removeAttr('style').removeClass('scroll');
		} else if($(window).scrollTop() >= pointStart && $(window).scrollTop() <= pointEnd){
			fixed.removeAttr('style').addClass('scroll');
			fixed.width(fixed.parent().width());
		} else if($(window).scrollTop() > pointEnd){
			fixed.removeAttr('style').removeClass('scroll');
			var marginTop = base.outerHeight() - fixed.height();
			fixed.css('margin-top',marginTop);
		}

		setTimeout(function(){
			destination = $('#card-' + id).offset().top - 30;
			$('html,body').stop().animate({
				scrollTop: destination
			},{
				duration: 200
			});
		},100);

	}

  }


  /**
   * Get candidates fields.
   */

  $scope.getCandidatesFields = function() {

    ApiDataFactory.queryGet('candidate/findFieldTypes').then(function(result) {
      $rootScope.updateProcess = false;
      $scope.fieldTypes = result;
    });


  }



  /**
   * Note action class.
   * this add() - add new note to $scope.notes array, with ket new.
   * this discard() - removes last element from $scope.notes array, exactly latest new.
   * this save() - Remowing new key, and sending request to add new note, then gets new data with ID's and Date of creation set.
   * this edit() - PARAMS : note - clicked edit entity | Update note via this id and with new value.
   * this deleteNote() - PARAMS : note - clicked edit entity | Splices $scope.array and send API request ( callback getCandidateNotes() )  with note id to delete.
   */

  $scope.noteAction = {
    add: function() {
      function note() {
        this.new = true;
        this.placeholder = "Note text";

      }
      $scope.notes.push(new note())
    },
    discard: function() {
      $scope.notes.splice($scope.notes.length - 1, 1)
    },
    edit: function(note) {
      $rootScope.updateProcess = true

      note.entityId = note.id
      note.type = 'CANDIDATE'
      note.text = note.comment
      URL = 'comment/' + note.id
      ApiDataFactory.queryPost(URL, note).then(function(result) {
        delete note.editNote
        $rootScope.updateProcess = false
        $scope.showToast()


      })
    },
    deletenote: function(note) {
      if (note.deleteNote) {
        $scope.notes.splice(_.indexOf($scope.notes, note), 1)
        var URL = 'comment/' + note.id
        ApiDataFactory.queryDelete(URL).then(function(result) {})
      };
      note.deleteNote = true
    },
    save: function() {
      $rootScope.updateProcess = true
      var note = $scope.notes[$scope.notes.length - 1]
      if (note.comment == "") {
        return
      };
      console.log(note)
      delete note.placeholder
      delete note.new
      delete note.creationDate
      note.entityId = $scope.currentCandidate.id
      note.type = 'CANDIDATE'
      note.text = note.comment
      delete note.comment

      var URL = "comment"
      ApiDataFactory.queryPost(URL, note).then(function(result) {

        getCandidateNotes()

      })
    }
  }



  /**
   * New custom candidate field action class.
   * this add() - sets first step, and view is showing input to enter name of field
   * this addText() - sets second step, where use is able to set text for custom field
   * this save() - gets all entered data and sends generated data to API, replaces all local entities from API data.
   * this candel() - cancels new field creation process
   * this delete() - deletes current focused field ($scope.currentField)
   */

  $scope.customField = {
    add: function() {
      delete $scope.currentField
      $scope.addFieldProgress = 1
    },
    addText: function() {
      $scope.addFieldProgress = 2
    },
    save: function() {
      $rootScope.updateProcess = true
      console.log($scope.newField)
      var URL = "candidate/" + $scope.currentCandidate.id + "/addfield"
      ApiDataFactory.queryPost(URL, $scope.newField).then(function(result) {
        $scope.candidatesData[_.indexOf($scope.candidatesData, result)] = result
        $scope.currentCandidate = result
        $scope.newField = {}
        $scope.newField.type = {}
        $rootScope.updateProcess = false
        $scope.showToast()
      })
    },
    cancel: function() {

      delete $scope.addProgress
      $scope.newFieldName = ''
      $scope.newFieldPrime = ''
      $scope.newFieldValue = ''
    },
    set: function(field) {
      $scope.currentField = field
    },
    unset: function() {
      delete $scope.currentField
    },
    delete: function(field) {
      var URL = 'candidate/removefield/' + field.id
      ApiDataFactory.queryDelete(URL).then(function(result) {
      api.getCandidate($scope.currentCandidate.id).then(function (data) {
        $scope.currentCandidate = data.data;
        _.each($scope.candidatesData, function(candidate, index) {
    if (candidate.id == $scope.currentCandidate.id ) {
      $scope.candidatesData[index] = $scope.currentCandidate
    }
        });
      })

        // _.each($scope.candidatesData, function(candidate) {
        //   candidate.id == $scope.currentCandidate.id ? delete candidate.summaryCard.customFields[field.type.name] : candidate
        // });
        // delete $scope.currentCandidate.summaryCard.customFields[field.type.name]
      })

    }
  }


  /**
   * Card quick action class.
   * this main() - sets current candidate, and switches to MAIN side menu tab
   * this flow() - sets current candidate, and switches to FLOW side menu tab
   * this notes() - sets current candidate, and switches to NOTE side menu tab
   */


  $scope.quickAction = {
    main: function(candidate) {
      $scope.returnSelectDefault = true
      $scope.currentCandidate = candidate
      $timeout(function() {
        $scope.selectedIndex = 0
      }, 0);

    },
    flow: function(candidate) {
      $scope.returnSelectDefault = true
      $scope.currentCandidate = candidate
      $timeout(function() {
        $scope.selectedIndex = 1
      }, 0);

    },
    notes: function(candidate) {
      $scope.returnSelectDefault = true
      $scope.currentCandidate = candidate

      $timeout(function() {
        $scope.selectedIndex = 3
      }, 0);

    },
    suggestions: function(candidate) {
      $scope.returnSelectDefault = true
      $scope.currentCandidate = candidate

      $timeout(function() {
        $scope.selectedIndex = 2
      }, 0);

    }
  }


  /**
   * Gets current candidate notes [ usable for refresh also ]
   */

  function getCandidateNotes() {

    ApiDataFactory.queryGet('comment/candidate/' + $scope.currentCandidateData.id).then(function(result) {
      $scope.notes = result
      $rootScope.updateProcess = false
    });

  }

  /**
   * Gets currentVacancy suggestions
   */

  $scope.suggestionSearch = debounce(500, function() {
    $scope.getSuggestions.suggested()
    $scope.getSuggestions.available()
  });


  $scope.getSuggestions = {
    search: function() {
      $scope.suggestionSearch()
    },
    suggested: function(loadMore) {

      $rootScope.updateProcess = true
      if (loadMore) {
        $scope.suggestedPage++
          console.log($scope.suggestedPage++)

      };

      ApiDataFactory.queryGet('vacancy/findRecommended?search=' + $scope.filterSuggestions + '&candidateId=' + $scope.currentCandidate.id + '&page=' + $scope.suggestedPage + '&size=5').then(function(result) {
        if ($scope.suggestedPage > 0) {
          _.each(result, function(vacancy) {
            $scope.flowSuggested.push(vacancy)

          });

        } else {
          $scope.flowSuggested = result;
          console.log(result)
        }
        $rootScope.updateProcess = false
      });

    },
    available: function(loadMore) {
      $rootScope.updateProcess = true
      if (loadMore) {
        $scope.availablePage++
          console.log($scope.availablePage++)
      };

      ApiDataFactory.queryGet('vacancy/findAvailable?search=' + $scope.filterSuggestions + '&candidateId=' + $scope.currentCandidate.id + '&page=' + $scope.availablePage + '&size=5').then(function(result) {
        if ($scope.availablePage > 0) {
          _.each(result, function(vacancy) {
            $scope.flowAvailable.push(vacancy)

          });

        } else {
          $scope.flowAvailable = result;
        }
        $rootScope.updateProcess = false

      });

    }
  }


$scope.loadFlow = function () {
  ApiDataFactory.queryGet('workflow/byCandidate/' + $scope.currentCandidateData.id).then(function(result) {
    $rootScope.updateProcess = false;
    $scope.candidatesFlowData = result // response data
  });
}

$scope.loadSuggestions = function () {
  $scope.suggestedPage = 0;
  $scope.availablePage = 0;
  $scope.getSuggestions.suggested($scope.suggestedPage)
  $scope.getSuggestions.available($scope.availablePage)
}

  /**
   * Selected tab watcher
   */


  $scope.$watch('selectedIndex', function(indexNew, indexOld) {

    if (indexNew == 1) {
      console.log("load flow")
    $scope.loadFlow();
    };
    if (indexNew == 3) {
      console.log("load notes")
    getCandidateNotes()
    };
    if (indexNew == 2) {
      console.log("load suggestions")
    $scope.loadSuggestions()
    };

  });

  /**
   * Automatically copy currentCandidate data to currentCandidatesData
   */

  $scope.$watch('currentCandidate', function(current, old) {
    $scope.currentCandidateData = angular.copy($scope.currentCandidate)
  }, true);



  /**
   * Sends selected flow data to API
   */

  $scope.sendFlow = function() {
    $rootScope.updateProcess = true
    var objToSend = {}
    objToSend.flows = $scope.flowData
    console.log(JSON.stringify(objToSend))
    ApiDataFactory.queryPost('workflow/', JSON.stringify(objToSend)).then(function(result) {
      $scope.selectedIndex = 1;
      $scope.flowaddModel = {}
      $rootScope.updateProcess = false
      $scope.showToast()
    })
  }

  /**
   * Watches new flow data selections
   */

  $scope.changeFlowData = function(vacancyId) {
    !$scope.flowaddModel[vacancyId]
    console.log($scope.flowaddModel)
    $scope.flowData = []
    _.each($scope.flowaddModel, function(state, vacancy) {
      if (state == true) {
        var vacancyEach = {}
        vacancyEach.candidateId = $scope.currentCandidate.id
        vacancyEach.vacancyId = parseInt(vacancy)
        $scope.flowData.push(vacancyEach)
      };
    });
  }

  /**
   * Mass auto complete
   */

  function suggest_state(term) {
    var q = term.toLowerCase().trim();
    var results = [];

    // Find first 10 states that start with `term`.
    for (var i = 0; i < $scope.fieldTypes.length && results.length < 10; i++) {
      var fieldName = $scope.fieldTypes[i];
      if (fieldName.toLowerCase().indexOf(q) === 0)
        results.push({
          label: fieldName,
          value: fieldName
        });
    }
    console.log(results)
    return results;
  }

  $scope.autocomplete_options = {
    suggest: suggest_state
  };


  $scope.changeFlowState = function(state, desc, flowid) {
    console.log(state)
    var data = {
  "state": state,
  "description": desc,
  "flowId": flowid
}
    api.positionStateForCadindate(data).then(
      function(data) {
console.info("Success");
      },
      function(error) {
console.error("Fail");
      })
  }

});
