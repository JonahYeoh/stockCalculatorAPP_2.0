import { Gauze, Cotton, CatheterLock, Chlohexidine } from "/JS/ObjectCreation/CVC.js";
import { Single_Use } from "/JS/ObjectCreation/Dialyzer.js";
import { Drug, Unihepa5k } from "/JS/ObjectCreation/Drug.js";
import { SurgicalMask, CombiRed, HandTowel, Bloodline, Dressing } from "/JS/ObjectCreation/General.js";
import { Needle } from "/JS/ObjectCreation/Needle.js";
import { Concentrate, Bibag, NormalSaline500, NormalSaline1000, SurgicalSpirit } from "/JS/ObjectCreation/Solution.js";
import { ThreeCCSyringe, TenCCSyringe, TwentyCCSyringe } from "/JS/ObjectCreation/Syringe.js";

var WakeUpCall = () => {
        tzuchi = {
            supplier: [{
                    minByPO: [{
                            Apex: {
                                name: "Apex",
                                list: [{
                                        item: new Bloodline("Bloodline 3 + 1", 30, 24, 0, 187.2, "bloodline")
                                    },
                                    {
                                        item: new Dressing("Dressing set", 2, 100, 0, 125, "dressing_r")
                                    }
                                ],
                                minPO: 220,
                                billOne: 0,
                                billTwo: 0,
                                checker: function() {
                                    if (this.bill >= this.minPO)
                                        return true;
                                    else
                                        return false;
                                }
                            }
                        },
                        {
                            Bergamot: {
                                name: "Bergamot",
                                list: [{
                                    item: new SurgicalMask("Surgical Mask", 4, 20, 0, 110, "sm_r")
                                }],
                                minPO: 400,
                                bill: 0,
                                checker: function() {
                                    if (this.bill >= this.minPO)
                                        return true;
                                    else
                                        return false;
                                }
                            }
                        },
                        {
                            Steriline: {
                                name: "Steriline",
                                list: [{
                                    item: new Chlohexidine("Chlohexideine 2% 60 ml", 2, 48, 0, 153.6, "chlohex_r")
                                }],
                                minPO: 200,
                                bill: 0,
                                checker: function() {
                                    if (this.bill >= this.minPO)
                                        return true;
                                    else
                                        return false;
                                }
                            }
                        },
                        {
                            Nipro: {
                                name: "NIPRO",
                                list: [{
                                        item: new Needle("AVF needle 15G", 24, 50, 0, 45, "avf15_r")
                                    },
                                    {
                                        item: new Needle("AVF needle 16G", 24, 50, 0, 45, "avf16_r")
                                    },
                                    {
                                        item: new Needle("AVF needle 17G", 12, 50, 0, 45, "avf17_r")
                                    }
                                ],
                                minPO: 200,
                                bill: 0,
                                checker: function() {
                                    if (this.bill >= this.minPO)
                                        return true;
                                    else
                                        return false;
                                }
                            }
                        },
                        {
                            Medico: {
                                name: "Medico",
                                list: [{
                                    item: new CombiRed("Combi Red Stopper", 20, 100, 0, 9.5, "stopper_r")
                                }],
                                minPO: 100,
                                bill: 0,
                                checker: function() {
                                    if (this.bill >= this.minPO)
                                        return true;
                                    else
                                        return false;
                                }
                            }
                        },
                        {
                            Propharm: {
                                name: "Propharm",
                                list: [{
                                    item: new Drug("Hepavax 20ug/vial", 30, 1, 0, 20, "hepavax20_r")
                                }],
                                minPO: 250,
                                bill: 0,
                                checker: function() {
                                    if (this.bill >= this.minPO)
                                        return true;
                                    else
                                        return false;
                                }
                            }
                        },
                    ]
                },
                {
                    noMin: [{
                            DKSH: {
                                name: "DKSH",
                                list: [{
                                        item: new Drug("Recormon 2000 Unit Prefilled Syringe ", 108, 6, 0, 666, "rec2k_r")
                                    },
                                    {
                                        item: new Drug("Bonky Inj 1 ml", 38, 10, 0, 168, "bonky1_r")
                                    },
                                    {
                                        item: new Unihepa5k("Unihepa 5000 Unit Per ML", 30, 10, 0, 100.3, "unihepa5k_r")
                                    },
                                    {
                                        item: new Drug("Mircera 100mg", 30, 1, 0, 185, "mir100_r")
                                    },
                                    {
                                        item: new SurgicalSpirit("Surgical Spirit 70%", 16, 1, 5, 55, "ss70_r")
                                    }
                                ]
                            }
                        },
                        {
                            B_braun: {
                                name: "B_braun",
                                list: [{
                                        item: new Concentrate("Ca 1.0mmol/L", 36, 2, 0, 39, "ca1")
                                    },
                                    {
                                        item: new Concentrate("Ca 1.25mmol/L", 36, 2, 0, 39, "ca1.25")
                                    },
                                    {
                                        item: new Concentrate("Ca 1.5mmol/L", 10, 2, 0, 39, "ca1.5")
                                    },
                                    {
                                        item: new NormalSaline500("Normal Saline 500 ml", 96, 10, 0, 17, "ns500_r")
                                    },
                                    {
                                        item: new NormalSaline1000("Normal Saline 1000 ml", 60, 10, 0, 27, "ns1000_r")
                                    }
                                ]
                            }
                        },
                        {
                            Apex_Pharma: {
                                name: "Apex-Pharma",
                                list: [{
                                    item: new Drug("Avofer 100mg/5ml", 13, 10, 0, 250, "avo100_r")
                                }]
                            }
                        },
                        {
                            Fresenius: {
                                name: "Fresenius Medical Care",
                                list: [{
                                    item: new Bibag("Bibag 650 mg 5008(new)", 36, 16, 0, 168, "bbag")
                                }]
                            }
                        },
                        {
                            NTPN: {
                                name: "NTPN",
                                list: [{
                                    item: new HandTowel("Hand towel", 4, 20, 0, 68.9, "handtowel_r")
                                }]
                            }
                        },
                        {
                            Promeditech: {
                                name: "Promeditech",
                                list: [{
                                        item: new ThreeCCSyringe("Syringe 3cc", 18, 100, 0, 16.5, "syr3_r")
                                    },
                                    {
                                        item: new TenCCSyringe("Syringe 10cc", 12, 100, 0, 18.5, "syr10_r")
                                    },
                                    {
                                        item: new TwentyCCSyringe("Syringe 20 cc", 40, 50, 0, 16.5, "syr20_r")
                                    },
                                    {
                                        item: new Cotton("Sterile Cotton", 16, 30, 0, 21, "sc_r")
                                    },
                                    {
                                        item: new Gauze("Sterile Gauze", 54, 20, 0, 14.5, "sg_r")
                                    }
                                ]
                            }
                        },
                        {
                            Zuelling: {
                                name: "Zuelling Pharma",
                                list: [{
                                    item: new Single_Use("Revaclear 300", 9, 24, 0, 732, "rev300_r")
                                }]
                            }
                        },
                        {
                            Wecan: {
                                name: "Wecan Medical",
                                list: [{
                                    item: new Drug("Citraflow 4%", 2, 100, 0, 750, "cit4_r")
                                }]
                            }
                        }
                    ]
                }
            ]
        }
        return tzuchi;
    }
    // var tzuchi = WakeUpCall();

export { WakeUpCall };