package com.capstone.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class TranslationController {

    @Autowired
    private MessageSource messageSource;

    @PostMapping("/translations")
    public Map<String, String> getTranslations(@RequestHeader("lang") String lang) {
        Locale locale = new Locale(lang);
        Map<String, String> translations = new HashMap<>();

        //Header
        translations.put("home", messageSource.getMessage("home", null, locale));
        translations.put("dictionary", messageSource.getMessage("dictionary", null, locale));
        translations.put("translate", messageSource.getMessage("translate", null, locale));
        translations.put("library", messageSource.getMessage("library", null, locale));
        translations.put("discovery", messageSource.getMessage("discovery", null, locale));
        translations.put("studyset", messageSource.getMessage("studyset", null, locale));
        translations.put("classroom", messageSource.getMessage("classroom", null, locale));
        translations.put("joinclass", messageSource.getMessage("joinclass", null, locale));
        translations.put("vocabulary", messageSource.getMessage("vocabulary", null, locale));
        translations.put("kanji", messageSource.getMessage("kanji", null, locale));
        translations.put("grammar", messageSource.getMessage("grammar", null, locale));
        translations.put("profile", messageSource.getMessage("profile", null, locale));
        translations.put("setting", messageSource.getMessage("setting", null, locale));
        translations.put("helpcenter", messageSource.getMessage("helpcenter", null, locale));
        translations.put("logout", messageSource.getMessage("logout", null, locale));
        translations.put("login", messageSource.getMessage("login", null, locale));
        translations.put("signup", messageSource.getMessage("signup", null, locale));

        //Login
        translations.put("welcomback", messageSource.getMessage("welcomeback", null, locale));
        translations.put("logincontinue", messageSource.getMessage("logincontinue", null, locale));
        translations.put("username", messageSource.getMessage("username", null, locale));
        translations.put("typeuser", messageSource.getMessage("typeuser", null, locale));
        translations.put("password", messageSource.getMessage("password", null, locale));
        translations.put("typepass", messageSource.getMessage("typepass", null, locale));
        translations.put("forgot", messageSource.getMessage("forgot", null, locale));
        translations.put("newuser", messageSource.getMessage("newuser", null, locale));

        //Forgot password
        translations.put("forgothelp", messageSource.getMessage("forgothelp", null, locale));
        translations.put("useremail", messageSource.getMessage("useremail", null, locale));
        translations.put("submit", messageSource.getMessage("submit", null, locale));

        //Sign up
        translations.put("getstart", messageSource.getMessage("getstart", null, locale));
        translations.put("createacc", messageSource.getMessage("createacc", null, locale));
        translations.put("typeyourusername", messageSource.getMessage("typeyourusername", null, locale));
        translations.put("firstname", messageSource.getMessage("firstname", null, locale));
        translations.put("typefirstname", messageSource.getMessage("typefirstname", null, locale));
        translations.put("lastname", messageSource.getMessage("lastname", null, locale));
        translations.put("typelastname", messageSource.getMessage("typelastname", null, locale));
        translations.put("email", messageSource.getMessage("email", null, locale));
        translations.put("typeemail", messageSource.getMessage("typeemail", null, locale));
        translations.put("enterpass", messageSource.getMessage("enterpass", null, locale));
        translations.put("role", messageSource.getMessage("role", null, locale));
        translations.put("leaner_role", messageSource.getMessage("leaner_role", null, locale));
        translations.put("tutor_role", messageSource.getMessage("tutor_role", null, locale));
        translations.put("register", messageSource.getMessage("register", null, locale));
        translations.put("haveaccount", messageSource.getMessage("haveaccount", null, locale));

        //Settings
        translations.put("accountsetting", messageSource.getMessage("accountsetting", null, locale));
        translations.put("myprofile", messageSource.getMessage("myprofile", null, locale));
        translations.put("notifi", messageSource.getMessage("notifi", null, locale));
        translations.put("languagesetting", messageSource.getMessage("languagesetting", null, locale));
        translations.put("changepass", messageSource.getMessage("changepass", null, locale));
        translations.put("deleteacc", messageSource.getMessage("deleteacc", null, locale));

        //My Account
        translations.put("birth", messageSource.getMessage("birth", null, locale));
        translations.put("phonesetting", messageSource.getMessage("phonesetting", null, locale));
        translations.put("gendersetting", messageSource.getMessage("gendersetting", null, locale));
        translations.put("male", messageSource.getMessage("male", null, locale));
        translations.put("female", messageSource.getMessage("female", null, locale));
        translations.put("other", messageSource.getMessage("other", null, locale));
        translations.put("addresssetting", messageSource.getMessage("addresssetting", null, locale));
        translations.put("biosetting", messageSource.getMessage("biosetting", null, locale));
        translations.put("saveprofile", messageSource.getMessage("saveprofile", null, locale));

        //Notifications
        translations.put("mailnoti", messageSource.getMessage("mailnoti", null, locale));
        translations.put("studyremind", messageSource.getMessage("studyremind", null, locale));
        translations.put("mailremind", messageSource.getMessage("mailremind", null, locale));
        translations.put("timeofday", messageSource.getMessage("timeofday", null, locale));
        translations.put("duedateremind", messageSource.getMessage("duedateremind", null, locale));
        translations.put("assignmentremind", messageSource.getMessage("assignmentremind", null, locale));
        translations.put("testremind", messageSource.getMessage("testremind", null, locale));
        translations.put("inclass", messageSource.getMessage("inclass", null, locale));
        translations.put("setadd", messageSource.getMessage("setadd", null, locale));
        translations.put("posted", messageSource.getMessage("posted", null, locale));
        translations.put("assignmentadd", messageSource.getMessage("assignmentadd", null, locale));
        translations.put("testadd", messageSource.getMessage("testadd", null, locale));
        translations.put("submissiongrade", messageSource.getMessage("submissiongrade", null, locale));

        //Language
        translations.put("chooselang", messageSource.getMessage("chooselang", null, locale));
        translations.put("adjustlang", messageSource.getMessage("adjustlang", null, locale));
        translations.put("changelang", messageSource.getMessage("changelang", null, locale));

        //Change password
        translations.put("changepasswo", messageSource.getMessage("changepasswo", null, locale));
        translations.put("currentpass", messageSource.getMessage("currentpass", null, locale));
        translations.put("newpass", messageSource.getMessage("newpass", null, locale));
        translations.put("confirmpass", messageSource.getMessage("confirmpass", null, locale));
        translations.put("ifyou", messageSource.getMessage("ifyou", null, locale));
        translations.put("resetpass", messageSource.getMessage("resetpass", null, locale));
        translations.put("requestlink", messageSource.getMessage("requestlink", null, locale));

        //Delete Account
        translations.put("permadel", messageSource.getMessage("permadel", null, locale));
        translations.put("delnote", messageSource.getMessage("delnote", null, locale));
        translations.put("curpass", messageSource.getMessage("curpass", null, locale));
        translations.put("curpassnote", messageSource.getMessage("curpassnote", null, locale));
        translations.put("delacc", messageSource.getMessage("delacc", null, locale));


        //Landing page
        translations.put("whatisnihongo", messageSource.getMessage("whatisnihongo", null, locale));
        translations.put("define_nlu", messageSource.getMessage("define_nlu", null, locale));

        //Dictionary
        translations.put("nludictionary", messageSource.getMessage("nludictionary", null, locale));
        translations.put("finddef", messageSource.getMessage("finddef", null, locale));
        translations.put("search", messageSource.getMessage("search", null, locale));

        //Translate
        translations.put("translates", messageSource.getMessage("translates", null, locale));
        translations.put("grammarcheck", messageSource.getMessage("grammarcheck", null, locale));
        translations.put("analysis", messageSource.getMessage("analysis", null, locale));
        translations.put("openai", messageSource.getMessage("openai", null, locale));
        translations.put("japantrans", messageSource.getMessage("japantrans", null, locale));
        translations.put("vntrans", messageSource.getMessage("vntrans", null, locale));
        translations.put("engtrans", messageSource.getMessage("engtrans", null, locale));

        //Discovery
        translations.put("all", messageSource.getMessage("all", null, locale));
        translations.put("studysets", messageSource.getMessage("studysets", null, locale));
        translations.put("classes", messageSource.getMessage("classes", null, locale));
        translations.put("users", messageSource.getMessage("users", null, locale));
        translations.put("viewall", messageSource.getMessage("viewall", null, locale));

        //Your Library
        translations.put("noset", messageSource.getMessage("noset", null, locale));
        translations.put("nosetnote", messageSource.getMessage("nosetnote", null, locale));
        translations.put("createset", messageSource.getMessage("createset", null, locale));
        translations.put("achievements", messageSource.getMessage("achievements", null, locale));
        translations.put("statistic", messageSource.getMessage("statistic", null, locale));
        translations.put("searchyourclass", messageSource.getMessage("searchyourclass", null, locale));
        translations.put("numlogin", messageSource.getMessage("numlogin", null, locale));
        translations.put("numset", messageSource.getMessage("numset", null, locale));
        translations.put("numjoin", messageSource.getMessage("numjoin", null, locale));
        translations.put("numlearn", messageSource.getMessage("numlearn", null, locale));

        //Join Class Popup
        translations.put("classcode", messageSource.getMessage("classcode", null, locale));
        translations.put("join", messageSource.getMessage("join", null, locale));

        //Send Feedback
        translations.put("contactus", messageSource.getMessage("contactus", null, locale));
        translations.put("hearfrom", messageSource.getMessage("hearfrom", null, locale));
        translations.put("choosetype", messageSource.getMessage("choosetype", null, locale));
        translations.put("titlefeed", messageSource.getMessage("titlefeed", null, locale));
        translations.put("contentfeed", messageSource.getMessage("contentfeed", null, locale));
        translations.put("sendfeed", messageSource.getMessage("sendfeed", null, locale));

        //CREATE STUDYSET
        translations.put("createstudysettitle", messageSource.getMessage("createstudysettitle", null, locale));
        translations.put("saved", messageSource.getMessage("saved", null, locale));
        translations.put("createstudyset", messageSource.getMessage("createstudyset", null, locale));
        translations.put("titleset", messageSource.getMessage("titleset", null, locale));
        translations.put("entertitle", messageSource.getMessage("entertitle", null, locale));
        translations.put("accessset", messageSource.getMessage("accessset", null, locale));
        translations.put("publicset", messageSource.getMessage("publicset", null, locale));
        translations.put("privateset", messageSource.getMessage("privateset", null, locale));
        translations.put("descriptionset", messageSource.getMessage("descriptionset", null, locale));
        translations.put("adddescript", messageSource.getMessage("adddescript", null, locale));
        translations.put("addcard", messageSource.getMessage("addcard", null, locale));
        translations.put("termset", messageSource.getMessage("termset", null, locale));
        translations.put("definitionset", messageSource.getMessage("definitionset", null, locale));
        translations.put("exampleset", messageSource.getMessage("exampleset", null, locale));
        translations.put("characterset", messageSource.getMessage("characterset", null, locale));
        translations.put("radicalset", messageSource.getMessage("radicalset", null, locale));
        translations.put("nameset", messageSource.getMessage("nameset", null, locale));
        translations.put("jlptlevel", messageSource.getMessage("jlptlevel", null, locale));
        translations.put("unknown", messageSource.getMessage("unknown", null, locale));
        translations.put("onyom", messageSource.getMessage("onyom", null, locale));
        translations.put("kunyom", messageSource.getMessage("kunyom", null, locale));
        translations.put("means", messageSource.getMessage("means", null, locale));
        translations.put("strok", messageSource.getMessage("strok", null, locale));
        translations.put("strokorder", messageSource.getMessage("strokorder", null, locale));
        translations.put("titlegram", messageSource.getMessage("titlegram", null, locale));
        translations.put("meangram", messageSource.getMessage("meangram", null, locale));
        translations.put("structureg", messageSource.getMessage("structureg", null, locale));
        translations.put("explan", messageSource.getMessage("explan", null, locale));
        translations.put("notegram", messageSource.getMessage("notegram", null, locale));

        //DELETE STUDYSET POPUP
        translations.put("delset", messageSource.getMessage("delset", null, locale));
        translations.put("delnoteset", messageSource.getMessage("delnoteset", null, locale));
        translations.put("deletenoteset", messageSource.getMessage("deletenoteset", null, locale));
        translations.put("confirmdel", messageSource.getMessage("confirmdel", null, locale));
        translations.put("close", messageSource.getMessage("close", null, locale));


        //VIEW STUDYSET
        translations.put("flashcard", messageSource.getMessage("flashcard", null, locale));
        translations.put("learn", messageSource.getMessage("learn", null, locale));
        translations.put("quiz", messageSource.getMessage("quiz", null, locale));
        translations.put("createdby", messageSource.getMessage("createdby", null, locale));
        translations.put("comments", messageSource.getMessage("comments", null, locale));
        translations.put("addclass", messageSource.getMessage("addclass", null, locale));
        translations.put("edit", messageSource.getMessage("edit", null, locale));
        translations.put("deleteset", messageSource.getMessage("deleteset", null, locale));
        translations.put("yourprogress", messageSource.getMessage("yourprogress", null, locale));
        translations.put("notstudy", messageSource.getMessage("notstudy", null, locale));
        translations.put("stilllearn", messageSource.getMessage("stilllearn", null, locale));
        translations.put("masteredset", messageSource.getMessage("masteredset", null, locale));
        translations.put("studyy", messageSource.getMessage("studyy", null, locale));
        translations.put("termnum", messageSource.getMessage("termnum", null, locale));
        translations.put("allprogress", messageSource.getMessage("allprogress", null, locale));
        translations.put("options", messageSource.getMessage("options", null, locale));
        translations.put("questype", messageSource.getMessage("questype", null, locale));
        translations.put("writtentype", messageSource.getMessage("writtentype", null, locale));
        translations.put("multiplechoice", messageSource.getMessage("multiplechoice", null, locale));
        translations.put("truefalse", messageSource.getMessage("truefalse", null, locale));
        translations.put("progrssstat", messageSource.getMessage("progrssstat", null, locale));
        translations.put("pictureop", messageSource.getMessage("pictureop", null, locale));
        translations.put("showpic", messageSource.getMessage("showpic", null, locale));
        translations.put("starop", messageSource.getMessage("starop", null, locale));
        translations.put("starterm", messageSource.getMessage("starterm", null, locale));
        translations.put("audioop", messageSource.getMessage("audioop", null, locale));
        translations.put("showaudio", messageSource.getMessage("showaudio", null, locale));
        translations.put("shuffle", messageSource.getMessage("shuffle", null, locale));
        translations.put("shuffcard", messageSource.getMessage("shuffcard", null, locale));
        translations.put("noteop", messageSource.getMessage("noteop", null, locale));
        translations.put("shownote", messageSource.getMessage("shownote", null, locale));
        translations.put("promptwith", messageSource.getMessage("promptwith", null, locale));
        translations.put("answerwith", messageSource.getMessage("answerwith", null, locale));
        translations.put("titleop", messageSource.getMessage("titleop", null, locale));
        translations.put("jlptlv", messageSource.getMessage("jlptlv", null, locale));
        translations.put("exampleop", messageSource.getMessage("exampleop", null, locale));
        translations.put("explanop", messageSource.getMessage("explanop", null, locale));
        translations.put("notewith", messageSource.getMessage("notewith", null, locale));
        translations.put("struciop", messageSource.getMessage("struciop", null, locale));
        translations.put("newLearn", messageSource.getMessage("newLearn", null, locale));
        translations.put("cancel", messageSource.getMessage("cancel", null, locale));
        translations.put("queslimit", messageSource.getMessage("queslimit", null, locale));
        translations.put("2ques", messageSource.getMessage("2ques", null, locale));
        translations.put("newquiz", messageSource.getMessage("newquiz", null, locale));

        //Stream in class
        translations.put("upcome", messageSource.getMessage("upcome", null, locale));
        translations.put("nowork", messageSource.getMessage("nowork", null, locale));
        translations.put("anouce", messageSource.getMessage("anouce", null, locale));
        translations.put("talktoclass", messageSource.getMessage("talktoclass", null, locale));
        translations.put("useastream", messageSource.getMessage("useastream", null, locale));


        //Assignment for learner in class
        translations.put("viewwork", messageSource.getMessage("viewwork", null, locale));
        translations.put("nodue", messageSource.getMessage("nodue", null, locale));
        translations.put("postedassignment", messageSource.getMessage("postedassignment", null, locale));
        translations.put("viewdetail", messageSource.getMessage("viewdetail", null, locale));
        translations.put("nograde", messageSource.getMessage("nograde", null, locale));
        translations.put("classcmt", messageSource.getMessage("classcmt", null, locale));
        translations.put("yourwork", messageSource.getMessage("yourwork", null, locale));
        translations.put("unsub", messageSource.getMessage("unsub", null, locale));
        translations.put("privatecmt", messageSource.getMessage("privatecmt", null, locale));
        translations.put("copylink", messageSource.getMessage("copylink", null, locale));
        translations.put("report", messageSource.getMessage("report", null, locale));

        //Test for learner in class
        translations.put("due", messageSource.getMessage("due", null, locale));
        translations.put("maxnum", messageSource.getMessage("maxnum", null, locale));
        translations.put("numattempt", messageSource.getMessage("numattempt", null, locale));
        translations.put("dotest", messageSource.getMessage("dotest", null, locale));
        translations.put("starttest", messageSource.getMessage("starttest", null, locale));
        translations.put("detailtest", messageSource.getMessage("detailtest", null, locale));
        translations.put("resulttest", messageSource.getMessage("resulttest", null, locale));
        translations.put("marktest", messageSource.getMessage("marktest", null, locale));
        translations.put("noattempt", messageSource.getMessage("noattempt", null, locale));
        translations.put("endtest", messageSource.getMessage("endtest", null, locale));

        //People in class
        translations.put("request", messageSource.getMessage("request", null, locale));
        translations.put("requestjoin", messageSource.getMessage("requestjoin", null, locale));
        translations.put("acceptjoin", messageSource.getMessage("acceptjoin", null, locale));
        translations.put("declinejoin", messageSource.getMessage("declinejoin", null, locale));
        translations.put("unenrollclass", messageSource.getMessage("unenrollclass", null, locale));
        translations.put("tutor", messageSource.getMessage("tutor", null, locale));
        translations.put("memberclass", messageSource.getMessage("memberclass", null, locale));
        translations.put("membercl", messageSource.getMessage("membercl", null, locale));

        //Create class popup
        translations.put("createclass", messageSource.getMessage("createclass", null, locale));
        translations.put("classnamee", messageSource.getMessage("classnamee", null, locale));
        translations.put("classdescript", messageSource.getMessage("classdescript", null, locale));
        translations.put("createclassbut", messageSource.getMessage("createclassbut", null, locale));

        //Edit class popup
        translations.put("editclass", messageSource.getMessage("editclass", null, locale));

        //Delete class popup
        translations.put("delclass", messageSource.getMessage("delclass", null, locale));
        translations.put("deleteclassnote", messageSource.getMessage("deleteclassnote", null, locale));
        translations.put("delclassbut", messageSource.getMessage("delclassbut", null, locale));
        translations.put("closeclass", messageSource.getMessage("closeclass", null, locale));


        //Delete Post
        translations.put("delpost", messageSource.getMessage("delpost", null, locale));
        translations.put("deletepostnote", messageSource.getMessage("deletepostnote", null, locale));
        translations.put("delpostbut", messageSource.getMessage("delpostbut", null, locale));

        //Create asignment
        translations.put("assign", messageSource.getMessage("assign", null, locale));
        translations.put("savedraft", messageSource.getMessage("savedraft", null, locale));
        translations.put("instructionassign", messageSource.getMessage("instructionassign", null, locale));
        translations.put("startassign", messageSource.getMessage("startassign", null, locale));
        translations.put("dueassign", messageSource.getMessage("dueassign", null, locale));
        translations.put("cancelassign", messageSource.getMessage("cancelassign", null, locale));


        //View asignment tutor
        translations.put("draftassign", messageSource.getMessage("draftassign", null, locale));
        translations.put("turnedin", messageSource.getMessage("turnedin", null, locale));
        translations.put("assigned", messageSource.getMessage("assigned", null, locale));
        translations.put("editassign", messageSource.getMessage("editassign", null, locale));
        translations.put("delassign", messageSource.getMessage("delassign", null, locale));
        translations.put("instrucassign", messageSource.getMessage("instrucassign", null, locale));
        translations.put("submissionassign", messageSource.getMessage("submissionassign", null, locale));

        //Delete assignment
        translations.put("delassignnote", messageSource.getMessage("delassignnote", null, locale));
        translations.put("delassignwarn", messageSource.getMessage("delassignwarn", null, locale));

        //Create test
        translations.put("durationtest", messageSource.getMessage("durationtest", null, locale));
        translations.put("numattempallow", messageSource.getMessage("numattempallow", null, locale));
        translations.put("questest", messageSource.getMessage("questest", null, locale));
        translations.put("optiontest", messageSource.getMessage("optiontest", null, locale));
        translations.put("addoption", messageSource.getMessage("addoption", null, locale));
        translations.put("point", messageSource.getMessage("point", null, locale));
        translations.put("answertest", messageSource.getMessage("answertest", null, locale));
        translations.put("truefalseques", messageSource.getMessage("truefalseques", null, locale));
        translations.put("multiques", messageSource.getMessage("multiques", null, locale));
        translations.put("writtenques", messageSource.getMessage("writtenques", null, locale));

        //Delete test
        translations.put("deltest", messageSource.getMessage("deltest", null, locale));
        translations.put("deltestwarn", messageSource.getMessage("deltestwarn", null, locale));

        //Reset Classcode
        translations.put("copycode", messageSource.getMessage("copycode", null, locale));
        translations.put("resetcode", messageSource.getMessage("resetcode", null, locale));

        //Class Statític
        translations.put("memjoined", messageSource.getMessage("memjoined", null, locale));
        translations.put("numassign", messageSource.getMessage("numassign", null, locale));
        translations.put("numtest", messageSource.getMessage("numtest", null, locale));
        translations.put("numpost", messageSource.getMessage("numpost", null, locale));
        translations.put("numlearner", messageSource.getMessage("numlearner", null, locale));

        return translations;
    }
}
